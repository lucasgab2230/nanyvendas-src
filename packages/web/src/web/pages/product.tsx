import { ArrowUpRight, Check, Heart, Info } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link, useParams } from "wouter";
import type { Category, Product } from "../../api/catalog/products";
import { categoryPath, productPath, productSeo } from "../../shared/seo";
import { useCatalog } from "../queries/catalog";
import { usePageMeta } from "../hooks/use-page-meta";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { WhatsappFab } from "../components/whatsapp-fab";
import { JewelPlate } from "../components/jewel-plate";
import { useSelection } from "../components/selection-provider";
import { formatPrice, productWhatsappLink } from "../lib/whatsapp";
import { CatalogState } from "./catalog-state";
import NotFound from "./not-found";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const catalog = useCatalog();
  if (!catalog.data) {
    return (
      <CatalogState
        error={catalog.isError}
        retry={() => {
          void catalog.refetch();
        }}
      />
    );
  }
  const product = catalog.data.products.find((item) => item.slug === slug);
  const category = catalog.data.categories.find((item) => item.slug === product?.category);
  if (!product || !category) return <NotFound />;
  const related = catalog.data.products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
  return <ProductContent product={product} category={category} related={related} />;
}

function ProductContent({
  product,
  category,
  related,
}: {
  product: Product;
  category: Category;
  related: Product[];
}) {
  const selection = useSelection();
  const saved = selection.ids.includes(product.id);
  usePageMeta(productSeo(product, category));
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="shell product-page">
        <nav id="topo" aria-label="Caminho da página" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href={categoryPath(category.slug)}>{category.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <article className="product-page-layout">
          <div className="product-page-photo">
            <JewelPlate image={product.image} alt={`Foto real de ${product.name}`} large priority />
            <p>Foto real da peça</p>
          </div>
          <div className="product-page-info">
            <p className="product-page-category">{category.name} · Nany</p>
            <h1>{product.name}</h1>
            <p className="product-reference">Referência: {product.slug}</p>
            <p className="product-page-price">
              {product.price === null ? "Preço sob consulta" : formatPrice(product.price)}
            </p>
            <p className="product-page-description">{product.description}</p>
            <h2>Detalhes da peça</h2>
            <ul className="product-highlights">
              {product.highlights
                .filter((item) => !item.startsWith("Preço da etiqueta"))
                .map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    {item}
                  </li>
                ))}
            </ul>
            <div className="product-page-actions">
              <a
                className="btn-whatsapp"
                href={productWhatsappLink(product)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp size={19} aria-hidden="true" />
                {product.price === null ? "Consultar no WhatsApp" : "Quero esta peça"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button
                type="button"
                className={`btn-secondary ${saved ? "selection-saved" : ""}`}
                onClick={() => selection.toggle(product)}
                aria-pressed={saved}
              >
                <Heart size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
                {saved ? "Salva na sua seleção" : "Salvar na minha seleção"}
              </button>
            </div>
            <p className="product-page-note">
              <Info size={17} aria-hidden="true" /> A Eliane confirma disponibilidade, valor final,
              pagamento e entrega ou retirada. Salvar não reserva a peça.
            </p>
          </div>
        </article>
        {related.length > 0 && (
          <section className="related-products" aria-labelledby="related-title">
            <h2 id="related-title">
              Mais peças em <em>{category.name.toLowerCase()}.</em>
            </h2>
            <div className="related-grid">
              {related.map((item) => (
                <a key={item.id} href={productPath(item.slug)} className="related-product">
                  <JewelPlate image={item.image} alt={`Foto real de ${item.name}`} />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
