import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client" instead of "react-dom"
import "./index.css";
import "antd/dist/antd";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer }, composeWithDevTools());

const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
