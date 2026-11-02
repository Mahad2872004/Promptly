import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import "./index.css";

const container = document.getElementById("root")!;
const app = <Root router={BrowserRouter} />;

// Public routes ship pre-rendered HTML (scripts/build-pages.ts), so hydrate
// it. The dev server, /styleguide and 404s send an empty shell — render fresh.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
