import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

/* Для просмотра store в консоли браузера */
window.store = store;
