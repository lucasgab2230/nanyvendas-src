import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SELECTION_STORAGE_KEY } from "../../src/web/lib/selection";

const cards = ".product-card";

test("abre a vitrine, carrega fotos leves e não tem erro de JavaScript", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Guarapuava.*Nany/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator(cards)).toHaveCount(12);
  await expect(page.getByText("53 peças encontradas", { exact: true })).toBeVisible();
  await expect(page.locator(".hero-photo-frame img")).toHaveAttribute(
    "src",
    /\/images\/optimized\/20261103_213857-\d+\.webp$/,
  );
  await expect(page.locator(".hero-photo-frame img")).toHaveAttribute(
    "alt",
    /Colar Árvore da Vida/,
  );
  await expect
    .poll(() =>
      page
        .locator(".hero-photo-frame img")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator("script[data-debug]")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("tema escuro preserva as fotos reais e marca a seleção sem depender só da cor", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#241d20");
  const photo = page.locator(".hero-photo-frame img");
  await expect(photo).toHaveCSS("filter", "none");
  await expect(photo).toHaveCSS("mix-blend-mode", "normal");
  await expect(photo).toHaveCSS("opacity", "1");
  await expect(page.locator(".product-photo").first()).toHaveCSS(
    "background-color",
    "rgb(238, 235, 231)",
  );
  await page.getByRole("button", { name: "Salvar Colar Árvore da Vida na seleção" }).click();
  const saved = page.getByRole("button", { name: "Remover Colar Árvore da Vida da seleção" });
  await expect(saved).toHaveAttribute("aria-pressed", "true");
  await expect(saved).toHaveCSS("background-color", "rgb(255, 155, 131)");
  await expect(saved).toHaveCSS("color", "rgb(43, 23, 32)");
});

test("busca sem acentos, filtra, ordena e restaura filtros ao recarregar", async ({ page }) => {
  await page.goto("/#catalogo");
  const search = page.getByRole("searchbox", { name: "Buscar semijoias" });
  await search.fill("borboleta");
  await expect(page.locator(cards)).toHaveCount(2);
  await page.getByRole("button", { name: "Pulseiras", exact: true }).click();
  await expect(page.getByText("Ainda não encontramos essa combinação.")).toBeVisible();
  await page.getByRole("button", { name: "Ver todas as peças", exact: true }).click();
  await page.getByRole("button", { name: "Anéis", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(6);
  await page.getByRole("combobox", { name: "Ordenar peças" }).selectOption("menor");
  await expect(page.locator(cards).first()).toContainText("Anel com Estrela");
  await page.reload();
  await expect(page.getByRole("button", { name: "Anéis", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("combobox", { name: "Ordenar peças" })).toHaveValue("menor");
  await page.getByRole("combobox", { name: "Filtrar por preço" }).selectOption("acima80");
  await expect(page.locator(cards)).toHaveCount(5);
});

test("permite conhecer as 53 peças com carregamento progressivo", async ({ page }) => {
  await page.goto("/#catalogo");
  await expect(page.locator(cards)).toHaveCount(12);
  await page.getByRole("button", { name: "Ver mais peças", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(24);
  await page.getByRole("button", { name: "Ver mais peças", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(36);
  await page.getByRole("button", { name: "Ver mais peças", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(48);
  await page.getByRole("button", { name: "Ver mais peças", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(53);
  await expect(page.getByRole("button", { name: "Ver mais peças", exact: true })).toHaveCount(0);
  await expect(page.getByText("Você viu 53 de 53 peças", { exact: true })).toBeVisible();
});

test("agrupa a lingerie em subcategorias com código e contagem", async ({ page }) => {
  await page.goto("/lingerie");
  const sections = page.locator(".collection-section");
  await expect(sections).toHaveCount(8);
  await expect(page.getByRole("heading", { name: "Calcinhas", level: 2 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sutiãs", level: 2 })).toBeVisible();
  await expect(page.getByText("43 peças encontradas", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Sutiãs9/ }).click();
  await expect(sections).toHaveCount(1);
  await expect(page.getByText("9 peças encontradas em Sutiãs", { exact: true })).toBeVisible();
  await page.getByRole("searchbox", { name: "Buscar lingerie" }).fill("6.7");
  await expect(page.locator(".collection-section .product-card")).toHaveCount(1);
});

test("detalhes: link direto, preço conhecido, WhatsApp correto e foco por teclado", async ({
  page,
}) => {
  await page.goto("/?categoria=aneis#catalogo");
  const trigger = page.getByRole("button", {
    name: "Ver detalhes de Anel Dourado",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Anel Dourado", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".modal-price")).toHaveText(/R\$\s139,90/);
  const url = new URL(
    (await dialog.getByRole("link", { name: "Quero esta peça" }).getAttribute("href"))!,
  );
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/5542988089633");
  expect(url.searchParams.get("text")).toContain("Anel Dourado");
  await expect(page).toHaveURL(/peca=anel-dourado/);
  await page.keyboard.press("Shift+Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.goto("/?peca=anel-dourado");
  await expect(page.getByRole("dialog", { name: "Anel Dourado" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Anel Dourado" })).toBeVisible();
});

test("destaque mostra o preço atual e o botão voltar fecha os detalhes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Conhecer esta peça", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Colar Árvore da Vida" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".modal-price")).toHaveText(/R\$\s59,90/);
  const link = new URL(
    (await dialog.getByRole("link", { name: "Quero esta peça" }).getAttribute("href"))!,
  );
  expect(link.searchParams.get("text")).toMatch(/R\$\s59,90/);
  await dialog.getByRole("button", { name: "Ver de pertinho — ampliar foto" }).click();
  await expect(dialog.getByRole("button", { name: "Diminuir foto" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goBack();
  await expect(dialog).not.toBeVisible();
});

test("seleção persiste, soma valores conhecidos e envia uma única mensagem", async ({ page }) => {
  await page.goto("/#catalogo");
  await page
    .getByRole("button", { name: "Salvar Colar Árvore da Vida na seleção", exact: true })
    .click();
  await page.getByRole("button", { name: "Salvar Anel Dourado na seleção", exact: true }).click();
  await expect(page.getByRole("button", { name: "Abrir sua seleção, 2 peças" })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Abrir sua seleção, 2 peças" }).click();
  const dialog = page.getByRole("dialog", { name: /Sua seleção/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/R\$\s59,90/, { exact: true })).toBeVisible();
  await expect(dialog.getByText(/R\$\s139,90/, { exact: true })).toBeVisible();
  await expect(dialog.locator(".selection-total strong")).toHaveText(/R\$\s199,80/);
  const link = new URL(
    (await dialog
      .getByRole("link", { name: "Enviar seleção pelo WhatsApp" })
      .getAttribute("href"))!,
  );
  expect(link.searchParams.get("text")).toContain("Colar Árvore da Vida");
  expect(link.searchParams.get("text")).toContain("Anel Dourado");
  expect(link.searchParams.get("text")).toContain("199,80");
  await dialog.getByRole("button", { name: "Remover Anel Dourado da seleção" }).click();
  await expect(dialog.getByText(/R\$\s59,90/, { exact: true })).toHaveCount(2);
  await dialog.getByRole("button", { name: "Remover Colar Árvore da Vida da seleção" }).click();
  await expect(dialog.getByText("Uma seleção com a sua cara")).toBeVisible();
});

test("trata armazenamento inválido e links de peças inexistentes sem quebrar", async ({ page }) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, "{invalido");
    localStorage.setItem("nany:selection:v1", JSON.stringify([8, 16]));
  }, SELECTION_STORAGE_KEY);
  await page.goto("/?peca=nao-existe");
  const dialog = page.getByRole("dialog", { name: "Essa peça não está na vitrine." });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Voltar para a vitrine" }).click();
  await expect(page.locator(cards)).toHaveCount(12);
  await page.getByRole("button", { name: "Abrir sua seleção", exact: true }).click();
  await expect(page.getByText("Uma seleção com a sua cara")).toBeVisible();
});

test("exibe recuperação quando a API falha e tenta novamente", async ({ page }) => {
  await page.route("**/api/rpc/catalog/list**", (route) => route.abort());
  // No build, envelhece apenas o estado incorporado para exercitar a falha
  // de atualização da API mesmo quando o HTML já vem pré-renderizado.
  await page.route(/\/$/, async (route) => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    const html = (await response.text()).replace(/"dataUpdatedAt":\d+/g, '"dataUpdatedAt":1');
    await route.fulfill({ response, body: html });
  });
  await page.goto("/#catalogo");
  await expect(page.getByText("A vitrine não carregou desta vez.")).toBeVisible();
  await page.unroute("**/api/rpc/catalog/list**");
  await page.getByRole("button", { name: "Tentar novamente", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(12);
});

test("uma foto ausente tem alternativa útil em vez de ícone quebrado", async ({ page }) => {
  await page.route("**/images/**", (route) => route.abort());
  await page.goto("/#catalogo");
  await expect(page.locator(cards).first().getByText("Foto indisponível")).toBeVisible();
});

test("coleções, menu, perguntas frequentes e página inexistente são navegáveis", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Navegação principal", exact: true })
      .getByRole("link", { name: "Vestuário", exact: true }),
  ).toHaveCount(0);
  await page.goto("/vestuario");
  await expect(page.getByText("Esse caminho não está aqui.")).toBeVisible();
  await page.goto("/lingerie");
  await expect(page.getByText(/As fotos de lingerie ainda não estão publicadas/)).toBeVisible();
  await page.getByRole("link", { name: "Explorar semijoias", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(12);
  await page.locator("summary").filter({ hasText: "Como faço meu pedido?" }).click();
  await expect(page.getByText(/Abra uma peça e toque no botão do WhatsApp/)).toBeVisible();
  await page.goto("/caminho-inexistente");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Esse caminho não está aqui.",
  );
  await page.getByRole("link", { name: "Voltar para a Nany", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(12);
});

test("auditoria automática de acessibilidade na vitrine, peça e seleção", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(cards)).toHaveCount(12);
  const audit = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  };
  await audit();
  await page.getByRole("button", { name: "Conhecer esta peça", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Colar Árvore da Vida" })).toBeVisible();
  await audit();
  await page.getByRole("dialog").getByRole("button", { name: "Salvar na minha seleção" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Fechar janela" }).click();
  await page.getByRole("button", { name: "Abrir sua seleção, 1 peça" }).click();
  await expect(page.getByRole("dialog", { name: /Sua seleção/ })).toBeVisible();
  await audit();
});

test("seleção funciona na visita mesmo quando o navegador bloqueia armazenamento", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "getItem", {
      value: () => {
        throw new DOMException("Bloqueado", "SecurityError");
      },
    });
    Object.defineProperty(Storage.prototype, "setItem", {
      value: () => {
        throw new DOMException("Bloqueado", "SecurityError");
      },
    });
  });
  await page.goto("/#catalogo");
  await page.getByRole("button", { name: "Salvar Anel Dourado na seleção", exact: true }).click();
  await page.getByRole("button", { name: "Abrir sua seleção, 1 peça" }).click();
  await expect(
    page.getByRole("dialog", { name: /Sua seleção/ }).getByText("Anel Dourado"),
  ).toBeVisible();
});

test("compartilhamento oferece link manual quando APIs do navegador não existem", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { value: undefined, configurable: true });
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
  });
  await page.goto("/?peca=anel-dourado");
  const dialog = page.getByRole("dialog", { name: "Anel Dourado" });
  await dialog.getByRole("button", { name: "Compartilhar esta peça" }).click();
  await expect(dialog.getByRole("textbox", { name: "Copie o link para compartilhar" })).toHaveValue(
    /\/semijoias\/anel-dourado$/,
  );
  await dialog.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(dialog.getByRole("button", { name: "Fechar janela" })).toBeInViewport();
});

test("layout não transborda em celular pequeno, tablet e notebook", async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(cards)).toHaveCount(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});

test("pagamento e garantia ficam visíveis e têm respostas coerentes no FAQ", async ({ page }) => {
  await page.goto("/#como-comprar");
  const payment = page.getByRole("group", { name: "Formas de pagamento" });
  await expect(
    payment.getByText("Pagamento via Pix, cartões de débito e crédito.", { exact: true }),
  ).toBeVisible();
  const installments = "*Parcelamento no cartão de crédito sob consulta da taxa da maquininha.";
  await expect(payment.getByText(installments, { exact: true })).toBeVisible();
  const noteIsBelowMethods = await payment.evaluate((element) => {
    const methods = element.querySelector(".payment-methods")!.getBoundingClientRect();
    const note = element.querySelector(".payment-installments")!.getBoundingClientRect();
    return note.top >= methods.bottom;
  });
  expect(noteIsBelowMethods).toBe(true);
  const warranty = "Garantia das peças de semijoias de 6 meses.";
  await expect(page.locator("#sobre").getByText(warranty, { exact: true })).toBeVisible();
  for (const [question, answer] of [
    ["Quais são as formas de pagamento?", installments],
    ["As semijoias têm garantia?", warranty],
  ]) {
    const detail = page.locator("#duvidas details").filter({ hasText: question });
    await detail.locator("summary").click();
    await expect(detail.locator("p")).toBeVisible();
    await expect(detail.locator("p")).toContainText(answer);
  }
});
