import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export function CatalogState({ error, retry }: { error: boolean; retry: () => void }) {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="shell catalog-route-state">
        <div className="catalog-empty" role={error ? "alert" : "status"}>
          <h1>{error ? "Não foi possível carregar a vitrine." : "Preparando a vitrine…"}</h1>
          {error && (
            <>
              <p>Tente novamente ou converse com a Eliane pelo WhatsApp.</p>
              <button type="button" className="btn-primary" onClick={retry}>
                Tentar novamente
              </button>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
