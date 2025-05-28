import React from "react";
import MainTemplate from "./components/MainTemplate";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <MainTemplate />
    </AppProvider>
  );
}

export default App;
