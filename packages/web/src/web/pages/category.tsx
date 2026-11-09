import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";
import type { Category, Product } from "../../api/catalog/products";
import { categoryDescriptions, categorySeo } from "../../shared/seo";
import { useCatalog } from "../queries/catalog";
import { usePageMeta } from "../hooks/use-page-meta";
import { ProductCard } from "../components/product-card";
import { ProductModal } from "../components/product-modal";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { WhatsappFab } from "../components/whatsapp-fab";
import { CatalogState } from "./catalog-state";
import NotFound from "./not-found";

export default function CategoryPage() {
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
  const category = catalog.data.categories.find((item) => item.slug === slug);
  const products = catalog.data.products.filter((product) => product.category === slug);
  if (!category || products.length === 0) return <NotFound />;
  return <CategoryContent category={category} products={products} />;
}

function CategoryContent({ category, products }: { category: Category; products: Product[] }) {
  const [selected, setSelected] = useState<Product | null>(null);
  usePageMeta(categorySeo(category));
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="shell category-page">
        <nav id="topo" aria-label="Caminho da página" className="breadcrumb">
          <Link href="/">Início</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{category.name}</span>
        </nav>
        <header className="category-page-heading">
          <h1>
            {category.name} em <em>Guarapuava.</em>
          </h1>
          <p>
            {categoryDescriptions[category.slug] ??
              `Veja as fotos de ${category.name.toLowerCase()} da Nany e confirme os detalhes com a Eliane.`}
          </p>
          <p>
            {products.length} {products.length === 1 ? "peça para conhecer" : "peças para conhecer"}
            . Preços e disponibilidade podem mudar.
          </p>
        </header>
        <section aria-label={`Peças de ${category.name}`}>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={category.name}
                onOpen={setSelected}
              />
            ))}
          </div>
        </section>
        <div className="category-page-back">
          <Link className="text-button" href="/">
            Ver todas as semijoias →
          </Link>
        </div>
      </main>
      <SiteFooter />
      <WhatsappFab />
      <ProductModal
        product={selected}
        categoryName={category.name}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
