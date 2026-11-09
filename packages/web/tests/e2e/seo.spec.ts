import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SELECTION_STORAGE_KEY } from "../../src/web/lib/selection";

test("páginas de categoria e produto têm conteúdo e metadados próprios", async ({ page }) => {
  await page.goto("/categorias/aneis");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Anéis em Guarapuava");
  await expect(page).toHaveTitle("Anéis em Guarapuava | Nany Semijoias");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://nanyvendas.vercel.app/categorias/aneis",
  );
  await page.getByRole("link", { name: "Anel Dourado", exact: true }).click();
  await expect(page).toHaveURL(/\/semijoias\/anel-dourado$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Anel Dourado");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://nanyvendas.vercel.app/semijoias/anel-dourado",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Anel Dourado | Nany Semijoias",
  );
  const schema = await page.locator("#structured-data").textContent();
  expect(
    JSON.parse(schema!)["@graph"].find((item: { "@type": string }) => item["@type"] === "Product")
      .offers.price,
  ).toBe(139.9);
  await page.getByRole("button", { name: "Salvar na minha seleção" }).click();
  await expect(page.getByRole("button", { name: "Salva na sua seleção" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("link", { name: "Anéis", exact: true }).first().click();
  await expect(page).toHaveURL(/\/categorias\/aneis$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Anéis em Guarapuava | Nany Semijoias",
  );
});

test("HTML de produção é legível e navegável sem JavaScript", async ({ page, browser }) => {
  const response = await page.goto("/");
  const html = await response!.text();
  test.skip(
    !html.includes('data-prerendered="true"'),
    "A pré-renderização é produzida no build, não no Vite dev.",
  );
  const origin = new URL(page.url()).origin;
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto(`${origin}/categorias/aneis`);
  await expect(staticPage.getByRole("heading", { level: 1 })).toContainText("Anéis em Guarapuava");
  await staticPage.getByRole("link", { name: "Anel Dourado", exact: true }).click();
  await expect(staticPage.getByRole("heading", { level: 1 })).toHaveText("Anel Dourado");
  await expect(staticPage.getByRole("link", { name: "Quero esta peça" })).toHaveAttribute(
    "href",
    /wa\.me\/5542988089633/,
  );
  await context.close();
});

test("hidrata o HTML existente sem recriar o título", async ({ page }) => {
  const initial = await page.request.get("/semijoias/anel-dourado");
  test.skip(
    !(await initial.text()).includes('data-prerendered="true"'),
    "A pré-renderização é produzida no build, não no Vite dev.",
  );

  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => (releaseScripts = resolve));
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() === "script") await scriptsReady;
    await route.continue();
  });
  await page.goto("/semijoias/anel-dourado", { waitUntil: "commit" });
  try {
    await expect(page.locator("h1")).toHaveText("Anel Dourado");
    await page.evaluate(() => {
      Object.defineProperty(document, "__nanyPrerenderNode", {
        value: document.querySelector("h1"),
        configurable: true,
      });
    });
  } finally {
    releaseScripts();
  }
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Salvar na minha seleção" }).click();
  await expect(page.getByRole("button", { name: "Salva na sua seleção" })).toBeVisible();
  expect(
    await page.evaluate(
      () => Reflect.get(document, "__nanyPrerenderNode") === document.querySelector("h1"),
    ),
  ).toBe(true);
});

test("recupera uma foto que falhou antes da hidratação", async ({ page }) => {
  const initial = await page.request.get("/semijoias/anel-dourado");
  test.skip(
    !(await initial.text()).includes('data-prerendered="true"'),
    "A pré-renderização é produzida no build, não no Vite dev.",
  );
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => (releaseScripts = resolve));
  await page.route("**/*", async (route) => {
    if (route.request().url().includes("/images/")) return route.abort();
    if (route.request().resourceType() === "script") await scriptsReady;
    await route.continue();
  });
  await page.goto("/semijoias/anel-dourado", { waitUntil: "commit" });
  try {
    await expect
      .poll(() =>
        page
          .locator(".product-photo img")
          .first()
          .evaluate((element: HTMLImageElement) => {
            return element.complete && element.naturalWidth === 0;
          }),
      )
      .toBe(true);
  } finally {
    releaseScripts();
  }
  await expect(page.locator(".product-photo").first().getByText("Foto indisponível")).toBeVisible();
});

test("usa a foto original se a versão otimizada estiver ausente", async ({ page }) => {
  await page.route("**/images/optimized/**", (route) => route.abort());
  await page.goto("/semijoias/anel-dourado");
  const photo = page.locator(".product-photo img").first();
  await expect(photo).toHaveAttribute("src", /\/images\/images\/.*\.jpg$/);
  await expect
    .poll(() => photo.evaluate((element: HTMLImageElement) => element.naturalWidth))
    .toBeGreaterThan(0);
});

test("hidrata com uma seleção salva sem perder a página ou emitir erro", async ({ page }) => {
  await page.addInitScript(
    (key) => localStorage.setItem(key, JSON.stringify([11])),
    SELECTION_STORAGE_KEY,
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /hydration|hydrat|React error #418/i.test(message.text()))
      errors.push(message.text());
  });
  await page.goto("/semijoias/anel-dourado");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Anel Dourado");
  await expect(page.getByRole("button", { name: "Salva na sua seleção" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(errors).toEqual([]);
});

test("recupera a interface se o estado pré-renderizado estiver inválido", async ({ page }) => {
  let modified = false;
  await page.route(/\/$/, async (route) => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    const original = await response.text();
    const body = original.replace(
      /(<script id="nany-query-state" type="application\/json">)[\s\S]*?(<\/script>)/,
      "$1{}$2",
    );
    modified = body !== original;
    await route.fulfill({ response, body });
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  test.skip(!modified, "O Vite dev não contém estado pré-renderizado.");
  await expect(page.locator(".product-card")).toHaveCount(12);
  await expect(page.getByText("53 peças encontradas", { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("preview permanece noindex após navegação interna", async ({ page }) => {
  const response = await page.goto("/semijoias/anel-dourado");
  const html = await response!.text();
  test.skip(!html.includes('data-site-noindex="true"'), "Este teste exige um build de preview.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.evaluate(() => Reflect.set(window, "__nanyPreviewNavigation", true));
  await page.getByRole("link", { name: "Anéis", exact: true }).first().click();
  await expect(page).toHaveURL(/\/categorias\/aneis$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await page.evaluate(() => Reflect.get(window, "__nanyPreviewNavigation"))).toBe(true);
  const robots = await page.request.get("/robots.txt");
  expect(await robots.text()).not.toContain("Sitemap:");
});

test("páginas novas passam na auditoria automática de acessibilidade", async ({ page }) => {
  for (const path of ["/categorias/aneis", "/semijoias/anel-dourado", "/lingerie"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations, path).toEqual([]);
  }
});
