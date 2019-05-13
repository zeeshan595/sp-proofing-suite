import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { RootReducer } from "./Controller/Root";
import logger from "redux-logger";
import "./Style.scss";

import App from "./View/App.connect"; 

const middleware = [];
if (process.env.NODE_ENV == "development") {
  middleware.push(logger);
}

const store = createStore(
  RootReducer,
  applyMiddleware(...middleware)
);

const appWithProvider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appWithProvider, document.getElementById("app"));  