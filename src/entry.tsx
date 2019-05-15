import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { RootReducer } from "./Controller/Root";
import logger from "redux-logger";
import "./Style.scss";

import App from "./View/App.connect";

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const app = firebase.initializeApp({
  apiKey: "AIzaSyBeayIQXkxDdk3J5bVtuXwu_061duvn_uQ",
  authDomain: "sp-proofing-suite.firebaseapp.com",
  databaseURL: "https://sp-proofing-suite.firebaseio.com",
  projectId: "sp-proofing-suite",
  storageBucket: "sp-proofing-suite.appspot.com",
  messagingSenderId: "198072435640",
  appId: "1:198072435640:web:df64301852b687ba"
});

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