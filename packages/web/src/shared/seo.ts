import type { Category, Product } from "../api/catalog/products";
import { storeFaq } from "./store-content";
import { STORE } from "./store";

/** Domínio de produção confirmado na Vercel. Atualize ao trocar de domínio. */
export const SITE_URL = "https://nanyvendas.vercel.app";
export const SITE_NAME = STORE.name;
export const SITE_PHONE = STORE.whatsappLabel;
/** Chave pública de verificação do IndexNow; não é senha nem token privado. */
export const INDEXNOW_KEY = "e2e8c83860a5a04d9f233a02c7473abe";
export const DEFAULT_SOCIAL_IMAGE = "/images/social/nany.jpg";

export const productPath = (slug: string) => `/semijoias/${encodeURIComponent(slug)}`;
export const categoryPath = (slug: string) => `/categorias/${encodeURIComponent(slug)}`;
export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();

export interface PageSeo {
  title: string;
  description: string;
  /** Undefined for error pages, which must not claim a canonical URL. */
  path?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>[];
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organizacao`,
  name: SITE_NAME,
  alternateName: "Nany",
  url: `${SITE_URL}/`,
  telephone: `+${STORE.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: STORE.locality,
    addressRegion: STORE.region,
    addressCountry: STORE.country,
  },
  areaServed: { "@type": "City", name: STORE.locality },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${STORE.whatsapp}`,
    availableLanguage: "Portuguese",
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  name: "Nany",
  url: `${SITE_URL}/`,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organizacao` },
};

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function homeSeo(): PageSeo {
  return {
    title: "Semijoias e lingerie em Guarapuava | Nany",
    description:
      "Conheça semijoias com fotos reais na Nany, em Guarapuava. Veja colares, pulseiras, brincos e anéis, além de lingerie com preços, códigos e tamanhos.",
    path: "/",
    image: DEFAULT_SOCIAL_IMAGE,
    imageAlt: "Nany: semijoias em Guarapuava, com foto real do Colar Árvore da Vida",
    structuredData: [
      organization,
      website,
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#duvidas`,
        mainEntity: storeFaq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

export function lingerieSeo(): PageSeo {
  return {
    title: "Lingerie em Guarapuava | Nany",
    description:
      "Calcinhas, sutiãs, cuecas, conjuntos, pijamas e leggings da Nany em Guarapuava, com fotos reais, código, preço e tamanhos disponíveis de cada peça.",
    path: "/lingerie",
    image: DEFAULT_SOCIAL_IMAGE,
    imageAlt: "Nany Semijoias e Mais em Guarapuava",
    structuredData: [
      organization,
      website,
      breadcrumb([
        { name: "Início", path: "/" },
        { name: "Lingerie", path: "/lingerie" },
      ]),
    ],
  };
}

/** Textos editoriais somente para categorias que têm produtos reais cadastrados. */
export const categoryDescriptions: Record<string, string> = {
  aneis:
    "Conheça anéis de acabamento dourado ou prateado, com fotos reais e detalhes de cada peça. Consulte medidas, disponibilidade e valor final com a Eliane.",
  colares:
    "Veja colares com correntes e pingentes em diferentes estilos. Cada foto mostra uma peça da vitrine; valores e disponibilidade são confirmados no WhatsApp.",
  pulseiras:
    "Descubra pulseiras com correntes, pingentes e outros detalhes. Veja as fotos reais e consulte medidas, valores e disponibilidade com a Eliane.",
  brincos:
    "Veja brincos pequenos, de argola e com pedras, em acabamento dourado ou prateado. Fotos reais, com preço informado pela loja e conferência pelo WhatsApp.",
};

export function categorySeo(category: Category): PageSeo {
  return {
    title: `${category.name} em Guarapuava | Nany Semijoias`,
    description: `${category.name} na Nany em Guarapuava: veja fotos reais das peças e consulte preços e disponibilidade com a Eliane pelo WhatsApp.`,
    path: categoryPath(category.slug),
    image: DEFAULT_SOCIAL_IMAGE,
    imageAlt: `${category.name} e outras semijoias da Nany em Guarapuava`,
    structuredData: [
      organization,
      website,
      breadcrumb([
        { name: "Início", path: "/" },
        { name: category.name, path: categoryPath(category.slug) },
      ]),
    ],
  };
}

export function productSeo(product: Product, category: Category): PageSeo {
  const path = productPath(product.slug);
  const url = absoluteUrl(path);
  const productData: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${url}#produto`,
    name: product.name,
    description: product.description,
    sku: product.slug,
    category: category.name,
    url,
  };
  if (product.image) productData.image = [absoluteUrl(product.image)];
  // Publicamos os preços informados pela loja, sem inventar estoque ou avaliações.
  if (product.price !== null) {
    productData.offers = {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "BRL",
      seller: { "@id": `${SITE_URL}/#organizacao` },
    };
  }
  return {
    title: `${product.name} | Nany Semijoias`,
    description: `${product.summary} Veja a foto real e consulte disponibilidade com a Eliane em Guarapuava.`,
    path,
    image: product.image ?? DEFAULT_SOCIAL_IMAGE,
    imageAlt: `Foto real: ${product.name}`,
    structuredData: [
      organization,
      website,
      breadcrumb([
        { name: "Início", path: "/" },
        { name: category.name, path: categoryPath(category.slug) },
        { name: product.name, path },
      ]),
      productData,
    ],
  };
}

export function notFoundSeo(): PageSeo {
  return {
    title: "Página não encontrada | Nany",
    description: "Volte para a vitrine da Nany e conheça as semijoias.",
    noindex: true,
  };
}

export function robotsContent(preview = false): string {
  return [
    "User-agent: *",
    "Allow: /",
    ...(preview ? [] : [`Sitemap: ${absoluteUrl("/sitemap.xml")}`]),
    "",
  ].join("\n");
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sitemapContent(products: Product[], categories: Category[]): string {
  const usedCategories = categories.filter((category) =>
    products.some((product) => product.category === category.slug),
  );
  const entries = [
    { path: "/", image: undefined },
    { path: "/lingerie", image: undefined },
    ...usedCategories.map((category) => ({ path: categoryPath(category.slug), image: undefined })),
    ...products.map((product) => ({ path: productPath(product.slug), image: product.image })),
  ];
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.map(({ path, image }) => {
      const imageTag = image
        ? `<image:image><image:loc>${xmlEscape(absoluteUrl(image))}</image:loc></image:image>`
        : "";
      return `  <url><loc>${xmlEscape(absoluteUrl(path))}</loc>${imageTag}</url>`;
    }),
    "</urlset>",
    "",
  ].join("\n");
}

/** Convenção opcional, não uma garantia de leitura ou citação por assistentes. */
export function llmsContent(categories: Category[], products: Product[]): string {
  const links = categories
    .filter((category) => products.some((product) => product.category === category.slug))
    .map(
      (category) =>
        `- [${category.name}](${absoluteUrl(categoryPath(category.slug))}): fotos e detalhes das peças.`,
    );
  return [
    "# Nany Semijoias, Vestuário e Lingerie",
    "",
    "> A Nany é uma vitrine de semijoias em Guarapuava, Paraná, com atendimento pela Eliane no WhatsApp.",
    "",
    `- [Vitrine de semijoias](${absoluteUrl("/")}): fotos reais de colares, pulseiras, brincos e anéis.`,
    `- [Lingerie](${absoluteUrl("/lingerie")}): calcinhas, sutiãs, cuecas, conjuntos, kits, pijamas, leggings e blusas, com código, preço e tamanhos disponíveis de cada peça.`,
    `- [Perguntas frequentes](${absoluteUrl("/#duvidas")}): pedidos, preços, entrega, pagamento e seleção.`,
    ...links,
    "",
    `Contato: WhatsApp ${SITE_PHONE} (https://wa.me/${STORE.whatsapp}).`,
    "O valor final, a disponibilidade, o pagamento e a entrega ou retirada são confirmados com a loja. Salvar uma peça não é reserva.",
    "",
  ].join("\n");
}

/** Pacote IndexNow opcional: enviar somente depois que este build estiver público. */
export function indexNowPayload(products: Product[], categories: Category[]) {
  const active = categories.filter((category) =>
    products.some((product) => product.category === category.slug),
  );
  return {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: absoluteUrl(`/${INDEXNOW_KEY}.txt`),
    urlList: [
      absoluteUrl("/"),
      absoluteUrl("/lingerie"),
      ...active.map((category) => absoluteUrl(categoryPath(category.slug))),
      ...products.map((product) => absoluteUrl(productPath(product.slug))),
    ],
  };
}
