import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./router";

import { ThemeProvider } from "@/components/theme-provider"

import { ErrorBoundary } from "react-error-boundary";
import { RootErrorFallback } from "./components/errors/root-error-fallback";

import "./index.css";
import './i18n';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Router />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
