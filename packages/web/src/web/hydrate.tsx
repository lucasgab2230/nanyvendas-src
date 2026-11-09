import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { hydrate, type DehydratedState } from "@tanstack/react-query";
import { Router } from "wouter";
import "./styles.css";
import App from "./app";
import { createAppQueryClient } from "./components/provider";

export function hydrateApp(root: HTMLElement, state: DehydratedState) {
  const queryClient = createAppQueryClient();
  hydrate(queryClient, state);
  hydrateRoot(
    root,
    <StrictMode>
      <Router>
        <App queryClient={queryClient} />
      </Router>
    </StrictMode>,
  );
}
