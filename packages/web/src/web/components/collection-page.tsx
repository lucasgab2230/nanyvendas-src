import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Flower2, Search } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import type { CatalogProduct } from "./product-card";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { WhatsappFab } from "./whatsapp-fab";
import { STORE, whatsappLink } from "../lib/whatsapp";
import { usePageMeta } from "../hooks/use-page-meta";
import { normalizeSearch } from "../lib/catalog";
import { lingerieSeo, notFoundSeo } from "../../shared/seo";

interface CollectionCategory {
  slug: string;
  name: string;
  tagline?: string;
  total?: number;
}

export function CollectionPage({
  kind,
  products = [],
  categories = [],
  isPending,
  isError,
  retry,
}: {
  kind: "vestuario" | "lingerie";
  products?: CatalogProduct[];
  categories?: CollectionCategory[];
  isPending: boolean;
  isError: boolean;
  retry: () => void;
}) {
  const isClothing = kind === "vestuario";
  const title = isClothing ? "Vestuário" : "Lingerie";
  const Icon = Flower2;
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todas");
  const message = `Olá, ${STORE.owner}! Vim pela página de ${title.toLowerCase()} da Nany. Você pode me confirmar tamanhos, valores e disponibilidade?`;
  usePageMeta(isClothing ? notFoundSeo() : lingerieSeo());

  /** Subcategorias com peças: cada uma vira uma seção própria da página. */
  const sections = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          products: products.filter((product) => product.category === category.slug),
        }))
        .filter((category) => category.products.length > 0),
    [categories, products],
  );

  const words = normalizeSearch(search).split(/\s+/).filter(Boolean);
  const visibleSections = sections
    .filter((section) => activeCategory === "todas" || section.slug === activeCategory)
    .map((section) => ({
      ...section,
      products: section.products.filter((product) => {
        if (words.length === 0) return true;
        const haystack = normalizeSearch(
          [
            product.name,
            product.summary,
            product.description,
            product.sizeNote ?? "",
            ...product.highlights,
            ...(product.sizes ?? []),
          ].join(" "),
        );
        return words.every((word) => haystack.includes(word));
      }),
    }))
    .filter((section) => section.products.length > 0);

  const shown = visibleSections.reduce((total, section) => total + section.products.length, 0);
  const categoryName = (slug: string) =>
    categories.find((category) => category.slug === slug)?.name;

  return (
    <>
      <SiteHeader title={title} />
      <main id="conteudo">
        <div className="shell collection-page" id="topo">
          <nav aria-label="Caminho da página" className="breadcrumb">
            <Link href="/">Início</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{title}</span>
          </nav>
          <section className="collection-hero">
            <div>
              <h1>
                {isClothing ? (
                  <>
                    Seu dia a dia.
                    <br />
                    <em>Do seu jeito.</em>
                  </>
                ) : (
                  <>
                    Lingerie em Guarapuava.{" "}
                    <br />
                    <em>Do seu jeito.</em>
                  </>
                )}
              </h1>
              <p>
                {isClothing
                  ? "Uma peça que combina com você faz a diferença. Veja as fotos e confirme tamanhos e valores com a Eliane."
                  : "Calcinhas, sutiãs, cuecas, conjuntos, pijamas, leggings e blusas: veja as fotos reais, o código e os tamanhos disponíveis de cada peça. Os valores são confirmados com a Eliane."}
              </p>
              <a
                className="btn-primary"
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp size={18} aria-hidden="true" /> Consultar {title.toLowerCase()}{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="collection-consult">
              <Icon size={65} strokeWidth={0.9} aria-hidden="true" />
              <h2>
                {isClothing
                  ? "Vamos encontrar sua próxima peça?"
                  : "Escolha com calma, converse com carinho."}
              </h2>
              {isPending ? (
                <output className="collection-loading">Conferindo a coleção…</output>
              ) : isError ? (
                <>
                  <p role="alert">Não conseguimos consultar a coleção agora.</p>
                  <button type="button" className="text-button" onClick={retry}>
                    Tentar novamente
                  </button>
                </>
              ) : (
                <p>
                  {products.length
                    ? `${products.length} peças em ${sections.length} ${
                        sections.length === 1 ? "categoria" : "categorias"
                      }. Escolha o tamanho na peça e confirme cor e valor com a Eliane.`
                    : `As fotos de ${title.toLowerCase()} ainda não estão publicadas no site. Consulte as opções atuais pelo WhatsApp.`}
                </p>
              )}
            </div>
          </section>

          {products.length > 0 && (
            <>
              <div className="catalog-tools">
                <div className="search-field">
                  <Search size={19} strokeWidth={1.6} aria-hidden="true" />
                  <label htmlFor="lingerie-search" className="sr-only">
                    Buscar lingerie
                  </label>
                  <input
                    id="lingerie-search"
                    aria-label="Buscar lingerie"
                    type="search"
                    placeholder="Busque por peça, modelo, tamanho ou código…"
                    value={search}
                    maxLength={120}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
              </div>
              <nav className="category-discovery" aria-label="Subcategorias de lingerie">
                <span>Explore por categoria:</span>
                <button
                  type="button"
                  className={`category-pill ${activeCategory === "todas" ? "active" : ""}`}
                  aria-pressed={activeCategory === "todas"}
                  onClick={() => setActiveCategory("todas")}
                >
                  Todas as peças<span>{products.length}</span>
                </button>
                {sections.map((section) => (
                  <button
                    type="button"
                    key={section.slug}
                    className={`category-pill ${activeCategory === section.slug ? "active" : ""}`}
                    aria-pressed={activeCategory === section.slug}
                    onClick={() => setActiveCategory(section.slug)}
                  >
                    {section.name}
                    <span>{section.products.length}</span>
                  </button>
                ))}
              </nav>
              <output className="catalog-result-row" aria-live="polite">
                {`${shown} ${shown === 1 ? "peça encontrada" : "peças encontradas"}${
                  activeCategory === "todas" ? "" : ` em ${categoryName(activeCategory)}`
                }`}
              </output>

              {shown === 0 && (
                <div className="catalog-empty">
                  <h2>Nada encontrado com esses termos.</h2>
                  <p>Tente outro nome, modelo, tamanho ou código. Ou peça uma sugestão para a Eliane.</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("todas");
                    }}
                  >
                    Ver todas as peças
                  </button>
                </div>
              )}

              {visibleSections.map((section) => (
                <section
                  key={section.slug}
                  id={section.slug}
                  className="collection-section"
                  aria-labelledby={`${section.slug}-title`}
                >
                  <div className="collection-section-heading">
                    <h2 id={`${section.slug}-title`}>{section.name}</h2>
                    <p>
                      {section.tagline ? `${section.tagline} · ` : ""}
                      {section.products.length}{" "}
                      {section.products.length === 1 ? "peça" : "peças"}
                    </p>
                  </div>
                  <div className="product-grid">
                    {section.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpen={setSelected}
                        selectable={false}
                        categoryName={section.name}
                      />
                    ))}
                  </div>
                </section>
              ))}

            </>
          )}

          <div className="collection-back">
            <p>A vitrine de semijoias também está cheia de detalhes para conhecer.</p>
            <a className="text-button" href="/#catalogo">
              Explorar semijoias <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
      <SiteFooter title={title} />
      <WhatsappFab />
      <ProductModal
        product={selected}
        categoryName={categoryName(selected?.category ?? "")}
        onClose={() => setSelected(null)}
        selectable={false}
      />
    </>
  );
}
