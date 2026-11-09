import { ArrowRight } from "lucide-react";
import { useCatalog } from "../queries/catalog";
import { SiteHeader } from "../components/site-header";
import { Hero } from "../components/hero";
import { Catalog } from "../components/catalog";
import { OtherCollections, HowToBuy, AboutOwner, Faq, FinalCta } from "../components/sections";
import { SiteFooter } from "../components/site-footer";
import { WhatsappFab } from "../components/whatsapp-fab";
import { ProductModal } from "../components/product-modal";
import { Dialog } from "../components/dialog";
import { useProductLink } from "../hooks/use-product-link";
import { usePageMeta } from "../hooks/use-page-meta";
import { homeSeo } from "../../shared/seo";

function Index() {
  usePageMeta(homeSeo());
  const catalog = useCatalog();
  const details = useProductLink();
  const selected = catalog.data?.products.find((product) => product.slug === details.slug) ?? null;
  const categoryName = catalog.data?.categories.find(
    (category) => category.slug === selected?.category,
  )?.name;
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero
          pieceCount={catalog.data?.total}
          featured={
            catalog.data?.featured[0] ?? catalog.data?.products.find((product) => product.featured)
          }
          onOpenProduct={details.open}
        />
        <Catalog onOpenProduct={details.open} />
        <OtherCollections />
        <HowToBuy />
        <AboutOwner />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <WhatsappFab />
      <ProductModal product={selected} categoryName={categoryName} onClose={details.close} />
      <Dialog
        open={Boolean(details.slug && catalog.isSuccess && !selected)}
        onClose={details.close}
        titleId="missing-product-title"
      >
        <div className="catalog-empty">
          <h2 id="missing-product-title">Essa peça não está na vitrine.</h2>
          <p>O link pode estar desatualizado. Que tal conhecer as outras semijoias da Nany?</p>
          <button type="button" className="btn-primary" onClick={details.close}>
            Voltar para a vitrine <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </Dialog>
    </>
  );
}
export default Index;
