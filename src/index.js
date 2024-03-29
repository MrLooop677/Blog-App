import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import route from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>

  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
  //</React.StrictMode>
);
