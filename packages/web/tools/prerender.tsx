import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { categories, products } from "../src/api/catalog/products";
import {
  categoryPath,
  categorySeo,
  homeSeo,
  lingerieSeo,
  llmsContent,
  notFoundSeo,
  productPath,
  productSeo,
  robotsContent,
  sitemapContent,
} from "../src/shared/seo";
import { renderDocument } from "../src/seo/prerender";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const template = await readFile(join(dist, "index.html"), "utf8");
// Previews Vercel são acessíveis ao rastreador, mas pedem noindex para evitar duplicação.
const preview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");
const routes = [
  { path: "/", output: "index.html", seo: homeSeo() },
  { path: "/lingerie", output: "lingerie/index.html", seo: lingerieSeo() },
  ...categories
    .filter((category) => products.some((product) => product.category === category.slug))
    .map((category) => ({
      path: categoryPath(category.slug),
      output: `categorias/${category.slug}/index.html`,
      seo: categorySeo(category),
    })),
  ...products.map((product) => {
    const category = categories.find((item) => item.slug === product.category);
    if (!category) throw new Error(`Categoria ausente para ${product.slug}`);
    return {
      path: productPath(product.slug),
      output: `semijoias/${product.slug}/index.html`,
      seo: productSeo(product, category),
    };
  }),
  { path: "/pagina-nao-encontrada", output: "404.html", seo: notFoundSeo() },
];
for (const route of routes) {
  const output = join(dist, route.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderDocument(template, route.path, route.seo, preview));
}
await Promise.all([
  writeFile(join(dist, "robots.txt"), robotsContent(preview)),
  writeFile(join(dist, "sitemap.xml"), sitemapContent(products, categories)),
  writeFile(join(dist, "llms.txt"), llmsContent(categories, products)),
]);
console.log(
  `SEO: ${routes.length - 1} páginas pré-renderizadas, 404, sitemap.xml, robots.txt e llms.txt${preview ? " (preview com noindex)" : ""}.`,
);
