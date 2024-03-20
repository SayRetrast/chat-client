import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/luna-amber/theme.css";
import "primeicons/primeicons.css";
import App from "./app";
import { PrimeReactProvider } from "primereact/api";
import { primeReactConfig } from "./lib/primeReactConfig";
// import UserProvider from "./contexts/UserContext";
// import AccessTokenProvider from "./contexts/AccessTokenContext";
import { Provider } from "react-redux";
import { store } from "./state/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={primeReactConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);
