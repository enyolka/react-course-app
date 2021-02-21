import React from "react";

import StoreProvider from "./store/StoreProvider";

import "./App.scss";

const App = () => {
  return (
    <StoreProvider>
      <header>Hello World!</header>
      <div>ok</div>
    </StoreProvider>
  );
};

export default App;
