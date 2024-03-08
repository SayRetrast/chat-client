import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import "primereact/resources/themes/luna-amber/theme.css";
import "primeicons/primeicons.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router";
import { primeReactConfig } from "./lib/primeReactConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={primeReactConfig}>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
