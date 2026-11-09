import type { DehydratedState } from "@tanstack/react-query";
import type * as TemplateBootstrap from "./__main";
import "./styles.css";

// O bootstrap gerenciado usa createRoot. Quando existe HTML pré-renderizado
// e um estado válido, hidratar preserva o conteúdo já exibido; nos demais
// casos carregamos o bootstrap original sem alterar o arquivo protegido.
const loadTemplateBootstrap: () => Promise<typeof TemplateBootstrap> = () => import("./__main");
const root = document.getElementById("root");
let initialState: DehydratedState | undefined;
if (root?.dataset.prerendered === "true") {
  try {
    const state = JSON.parse(
      document.getElementById("nany-query-state")?.textContent ?? "null",
    ) as DehydratedState | null;
    if (Array.isArray(state?.queries) && state.queries.length > 0) initialState = state;
  } catch {
    // O template recria a interface quando o estado incorporado está inválido.
  }
}

async function start() {
  if (root && initialState) {
    try {
      const { hydrateApp } = await import("./hydrate");
      hydrateApp(root, initialState);
      return;
    } catch {
      // Uma falha ao hidratar não deve impedir o carregamento da vitrine.
    }
  }
  await loadTemplateBootstrap();
}
void start();
