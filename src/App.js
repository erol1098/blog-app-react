import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
