import React, { StrictMode } from "react";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { DesignSystemProvider } from "./components/ui/DesignSystemProvider";

/** The app with its providers — shared by the browser entry and the pre-renderer. */
export function Root({ router: Router }: { router: React.ComponentType<{ children: React.ReactNode }> }) {
  return (
    <StrictMode>
      <ThemeProvider>
        <DesignSystemProvider>
          <Router>
            <App />
          </Router>
        </DesignSystemProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
