// styles
import "@/index.css";

import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// components
import App from "@/app";
import { SidebarProvider } from "@/components/ui/sidebar";
// contexts
import { SearchProvider } from "@/contexts/search-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
// states
import store from "@/states";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <SearchProvider>
        <BrowserRouter>
          <SidebarProvider>
            <StrictMode>
              <NuqsAdapter>
                <App />
              </NuqsAdapter>
            </StrictMode>
          </SidebarProvider>
        </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  </Provider>,
);
