import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { store } from "./app/store";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
