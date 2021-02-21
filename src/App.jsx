import React from "react";

import Header from "./components/Header/Header";
import StoreProvider from "./store/StoreProvider";

import "./App.scss";

const App = () => {
  return (
    <StoreProvider>
      <Header />
      <div>ok</div>
    </StoreProvider>
  );
};

export default App;
