import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/luna-amber/theme.css";
import "primeicons/primeicons.css";
import App from "./app";
import { PrimeReactProvider } from "primereact/api";
import { primeReactConfig } from "./lib/primeReactConfig";
import UserProvider from "./contexts/UserContext";
import AccessTokenProvider from "./contexts/AccessTokenContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={primeReactConfig}>
      <AccessTokenProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AccessTokenProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
