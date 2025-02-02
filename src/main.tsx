import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Todos } from "./examples/Todos";
import Counter from "./examples/Counter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Todos />
    <Counter />
  </StrictMode>
);
