import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import ThemContextProvider from "./context/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemContextProvider>
    </BrowserRouter>
  </StrictMode>
);
