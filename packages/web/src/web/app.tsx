import { useEffect } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { Route, Switch, useLocation } from "wouter";
import { AgentFeedback } from "@runablehq/website-runtime";
import Index from "./pages/index";
import LingeriePage from "./pages/lingerie";
import CategoryPage from "./pages/category";
import ProductPage from "./pages/product";
import NotFound from "./pages/not-found";
import { Provider, createAppQueryClient } from "./components/provider";
import { SelectionDrawer } from "./components/selection-drawer";
import { AppErrorBoundary } from "./components/error-boundary";

function RouteScroll() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

const fallbackQueryClient = createAppQueryClient();

function App({ queryClient = fallbackQueryClient }: { queryClient?: QueryClient }) {
  return (
    <AppErrorBoundary>
      <Provider queryClient={queryClient}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <RouteScroll />
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/lingerie" component={LingeriePage} />
          <Route path="/categorias/:slug" component={CategoryPage} />
          <Route path="/semijoias/:slug" component={ProductPage} />
          <Route component={NotFound} />
        </Switch>
        <SelectionDrawer />
        {/* Feedback da plataforma, disponível somente durante o desenvolvimento. */}
        {import.meta.env?.DEV && <AgentFeedback />}
      </Provider>
    </AppErrorBoundary>
  );
}
export default App;
