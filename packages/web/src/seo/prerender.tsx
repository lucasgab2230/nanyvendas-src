import { renderToString } from "react-dom/server";
import { dehydrate } from "@tanstack/react-query";
import { Router } from "wouter";
import { categories, products } from "../api/catalog/products";
import { lingerieCategories, lingerieProducts } from "../api/catalog/lingerie-products";
import { absoluteUrl, DEFAULT_SOCIAL_IMAGE, type PageSeo } from "../shared/seo";
import App from "../web/app";
import { createAppQueryClient } from "../web/components/provider";
import { orpc } from "../web/lib/api";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** O head está presente na primeira resposta HTTP, sem esperar JavaScript. */
export function renderSeoHead(seo: PageSeo, preview = false): string {
  const meta = (kind: "name" | "property", key: string, content: string) =>
    `    <meta ${kind}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  const image = absoluteUrl(seo.image ?? DEFAULT_SOCIAL_IMAGE);
  const tags = [
    `    <title>${escapeHtml(seo.title)}</title>`,
    meta("name", "description", seo.description),
    meta(
      "name",
      "robots",
      preview || seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
    ),
    meta("property", "og:locale", "pt_BR"),
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", "Nany"),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    meta("property", "og:image", image),
    meta("property", "og:image:alt", seo.imageAlt ?? "Nany em Guarapuava"),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", image),
  ];
  if (seo.path) {
    const url = absoluteUrl(seo.path);
    tags.push(`    <link rel="canonical" href="${escapeHtml(url)}" />`);
    tags.push(meta("property", "og:url", url));
  }
  if (seo.structuredData?.length) {
    tags.push(
      `    <script id="structured-data" type="application/ld+json">${safeJson({ "@context": "https://schema.org", "@graph": seo.structuredData })}</script>`,
    );
  }
  return tags.join("\n");
}

/** Renderiza a própria interface React com o catálogo real, não conteúdo paralelo para robôs. */
export function renderDocument(
  template: string,
  path: string,
  seo: PageSeo,
  preview = false,
): string {
  const client = createAppQueryClient();
  client.setQueryData(orpc.catalog.list.queryOptions({ input: { category: "todas" } }).queryKey, {
    categories,
    products,
    total: products.length,
    featured: products.filter((product) => product.featured).slice(0, 3),
  });
  client.setQueryData(orpc.lingerie.list.queryOptions({ input: { category: "todas" } }).queryKey, {
    // Subcategorias com a contagem usada pelas seções da página de lingerie.
    categories: lingerieCategories.map((category) => ({
      ...category,
      total: lingerieProducts.filter((product) => product.category === category.slug).length,
    })),
    products: lingerieProducts,
    total: lingerieProducts.length,
    catalogTotal: lingerieProducts.length,
    featured: lingerieProducts.filter((product) => product.category === "calcinhas").slice(0, 3),
  });
  const markup = renderToString(
    <Router ssrPath={path}>
      <App queryClient={client} />
    </Router>,
  );
  const state = safeJson(dehydrate(client));
  const headMarker = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
  const rootMarker = '<div id="root"></div>';
  if (!headMarker.test(template) || !template.includes(rootMarker)) {
    throw new Error(
      "Não foi possível localizar os marcadores de SEO e da interface no HTML do Vite.",
    );
  }
  return template
    .replace(
      headMarker,
      () => `<!-- SEO_HEAD_START -->\n${renderSeoHead(seo, preview)}\n    <!-- SEO_HEAD_END -->`,
    )
    .replace(
      rootMarker,
      () =>
        `<div id="root" data-prerendered="true">${markup}</div>\n    <script id="nany-query-state" type="application/json">${state}</script>`,
    )
    .replace(
      '<html lang="pt-BR">',
      `<html lang="pt-BR"${preview ? ' data-site-noindex="true"' : ""}>`,
    );
}
