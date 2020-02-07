import React from "react";
import { ContextProvider } from "./Store";
import Home from "./Pages/Home";

export const App = () => {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
};
