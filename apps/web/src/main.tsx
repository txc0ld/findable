import "@fontsource/jetbrains-mono";
import "./styles/global.css";

import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

document.documentElement.classList.add("dark");

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <>
    <App />
    <Analytics />
  </>,
);
