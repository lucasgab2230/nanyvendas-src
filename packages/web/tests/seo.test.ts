import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { JSDOM } from "jsdom";
import { categories, products } from "../src/api/catalog/products";
import { renderDocument, renderSeoHead } from "../src/seo/prerender";
import {
  SITE_URL,
  INDEXNOW_KEY,
  absoluteUrl,
  categoryPath,
  categorySeo,
  homeSeo,
  indexNowPayload,
  lingerieSeo,
  llmsContent,
  notFoundSeo,
  productPath,
  productSeo,
  robotsContent,
  sitemapContent,
} from "../src/shared/seo";
import { storeFaq } from "../src/shared/store-content";

const template = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const documentFor = (path: string, seo: Parameters<typeof renderDocument>[2], preview = false) =>
  new JSDOM(renderDocument(template, path, seo, preview)).window.document;
const graph = (document: Document) =>
  JSON.parse(document.querySelector("#structured-data")!.textContent!)["@graph"] as Record<
    string,
    any
  >[];

describe("SEO técnico e conteúdo para respostas", () => {
  it("entrega HTML real da vitrine, links e respostas antes do JavaScript", () => {
    const doc = documentFor("/", homeSeo());
    assert.match(doc.querySelector("h1")!.textContent!, /Semijoias/);
    assert.equal(doc.querySelectorAll("#root .product-card").length, 12);
    for (const category of categories.filter((item) =>
      products.some((p) => p.category === item.slug),
    )) {
      assert.ok(doc.querySelector(`a[href="${categoryPath(category.slug)}"]`));
    }
    assert.ok(
      doc.querySelector(`a[href="${productPath(products[0]!.slug)}"]`) ||
        doc.querySelector('a[href^="/semijoias/"]'),
    );
    assert.equal(doc.querySelectorAll("#duvidas details").length, storeFaq.length);
    const faq = graph(doc).find((item) => item["@type"] === "FAQPage")!;
    assert.deepEqual(
      faq.mainEntity.map((item: any) => [item.name, item.acceptedAnswer.text]),
      storeFaq.map((item) => [item.q, item.a]),
    );
    for (const { q, a } of storeFaq) {
      assert.ok(doc.querySelector("#duvidas")!.textContent!.includes(q));
      assert.ok(doc.querySelector("#duvidas")!.textContent!.includes(a));
    }
    assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute("href"), `${SITE_URL}/`);
    assert.equal(
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      absoluteUrl("/images/social/nany.jpg"),
    );
  });

  it("publica pagamento, ressalva de parcelamento e garantia nos contextos corretos", () => {
    const doc = documentFor("/", homeSeo());
    const payment = doc.querySelector("#como-comprar .payment-info")!;
    assert.equal(
      payment.querySelector(".payment-methods")?.textContent,
      "Pagamento via Pix, cartões de débito e crédito.",
    );
    assert.equal(
      payment.querySelector(".payment-methods + .payment-installments")?.textContent,
      "*Parcelamento no cartão de crédito sob consulta da taxa da maquininha.",
    );
    assert.equal(
      doc.querySelector("#sobre .about-warranty")?.textContent,
      "Garantia das peças de semijoias de 6 meses.",
    );
    const faq = graph(doc).find((item) => item["@type"] === "FAQPage")!;
    for (const text of [
      "Pagamento via Pix, cartões de débito e crédito.",
      "*Parcelamento no cartão de crédito sob consulta da taxa da maquininha.",
      "Garantia das peças de semijoias de 6 meses.",
    ]) {
      assert.ok(faq.mainEntity.some((item: any) => item.acceptedAnswer.text.includes(text)));
    }
  });

  it("cria metadados e HTML próprios para lingerie, categoria e peça", () => {
    const category = categories.find((item) => item.slug === "aneis")!;
    const product = products.find((item) => item.slug === "anel-dourado")!;
    for (const [path, seo, text] of [
      ["/lingerie", lingerieSeo(), "Lingerie em Guarapuava"],
      [categoryPath(category.slug), categorySeo(category), "Anéis em Guarapuava"],
      [productPath(product.slug), productSeo(product, category), product.name],
    ] as const) {
      const doc = documentFor(path, seo);
      assert.ok(doc.querySelector("#root h1")!.textContent!.includes(text));
      assert.equal(doc.title, seo.title);
      assert.equal(
        doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        absoluteUrl(path),
      );
      assert.equal(
        doc.querySelector('meta[property="og:url"]')?.getAttribute("content"),
        absoluteUrl(path),
      );
      assert.equal(
        doc.querySelector('meta[name="description"]')?.getAttribute("content"),
        seo.description,
      );
    }
    const doc = documentFor(productPath(product.slug), productSeo(product, category));
    assert.match(doc.querySelector("main")!.textContent!, /139,90/);
    assert.ok(doc.querySelector('a[href^="https://wa.me/5542988089633"]'));
    assert.ok(graph(doc).some((item) => item["@type"] === "BreadcrumbList"));
  });

  it("anuncia apenas preços existentes, sem inventar estoque ou avaliações", () => {
    for (const product of products) {
      const category = categories.find((item) => item.slug === product.category)!;
      const data = productSeo(product, category).structuredData!.find(
        (item) => item["@type"] === "Product",
      )!;
      assert.equal(data.name, product.name);
      assert.equal(data.url, absoluteUrl(productPath(product.slug)));
      assert.equal(data.aggregateRating, undefined);
      assert.equal(data.review, undefined);
      if (product.price === null) assert.equal(data.offers, undefined);
      else {
        const offer = data.offers as Record<string, unknown>;
        assert.equal(offer.price, product.price);
        assert.equal(offer.priceCurrency, "BRL");
        assert.equal(offer.availability, undefined);
      }
    }
  });

  it("previews e erros pedem noindex e a página de erro não tem canonical", () => {
    const preview = documentFor("/", homeSeo(), true);
    assert.equal(preview.documentElement.dataset.siteNoindex, "true");
    assert.match(preview.querySelector('meta[name="robots"]')!.getAttribute("content")!, /noindex/);
    const error = documentFor("/nao-existe", notFoundSeo());
    assert.match(error.querySelector('meta[name="robots"]')!.getAttribute("content")!, /noindex/);
    assert.equal(error.querySelector('link[rel="canonical"]'), null);
    assert.equal(error.querySelector("#structured-data"), null);
    assert.doesNotMatch(robotsContent(true), /Sitemap:/);
  });

  it("protege o HTML e o JSON-LD de conteúdo interpretado como marcação", () => {
    const head = renderSeoHead({
      title: '<script>alert("x")</script>',
      description: 'teste & "detalhes"',
      path: "/",
      structuredData: [{ "@type": "Thing", name: "</script><script>alert(1)</script>" }],
    });
    const doc = new JSDOM(`<html><head>${head}</head><body></body></html>`).window.document;
    assert.equal(doc.title, '<script>alert("x")</script>');
    const full = documentFor("/", {
      title: "$& e $' literalmente",
      description: "Teste",
      path: "/",
    });
    assert.equal(full.title, "$& e $' literalmente");
    assert.equal(doc.querySelectorAll("script").length, 1);
    assert.equal(graph(doc)[0]!.name, "</script><script>alert(1)</script>");
  });

  it("prepara IndexNow com chave pública e somente URLs canônicas", () => {
    const payload = indexNowPayload(products, categories);
    assert.equal(payload.host, new URL(SITE_URL).host);
    assert.equal(payload.key, INDEXNOW_KEY);
    assert.equal(payload.keyLocation, absoluteUrl(`/${INDEXNOW_KEY}.txt`));
    assert.equal(
      readFileSync(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url), "utf8"),
      INDEXNOW_KEY,
    );
    // Início, lingerie, 4 categorias com peças e as 53 peças publicadas.
    assert.equal(payload.urlList.length, 1 + 1 + categories.length + products.length);
    assert.equal(new Set(payload.urlList).size, payload.urlList.length);
    assert.ok(payload.urlList.every((url) => new URL(url).origin === SITE_URL));
  });

  it("sitemap é XML válido, único e cobre somente páginas publicadas", () => {
    const xml = new JSDOM(sitemapContent(products, categories), { contentType: "text/xml" }).window
      .document;
    const urls = [
      ...xml.getElementsByTagNameNS("http://www.sitemaps.org/schemas/sitemap/0.9", "loc"),
    ].map((node) => node.textContent!);
    const activeCategories = categories.filter((category) =>
      products.some((product) => product.category === category.slug),
    );
    assert.equal(urls.length, 2 + activeCategories.length + products.length);
    assert.equal(new Set(urls).size, urls.length);
    for (const product of products)
      assert.ok(urls.includes(absoluteUrl(productPath(product.slug))));
    assert.ok(!urls.includes(absoluteUrl(categoryPath("conjuntos"))));
    assert.equal(
      xml.getElementsByTagNameNS("http://www.google.com/schemas/sitemap-image/1.1", "loc").length,
      products.filter((p) => p.image).length,
    );
    assert.match(robotsContent(), new RegExp(`${SITE_URL}/sitemap\\.xml`));
    const llms = llmsContent(categories, products);
    assert.match(llms, /Guarapuava/);
    assert.ok(llms.includes(absoluteUrl("/lingerie")));
    assert.doesNotMatch(llms, /estoque garantido|frete grátis/i);
  });
});
