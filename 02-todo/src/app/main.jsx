import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./store/store";
import { activateTokenHeader, activateTokenChecker } from "./api";

import "./styles/index.css";

activateTokenHeader();
activateTokenChecker();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
