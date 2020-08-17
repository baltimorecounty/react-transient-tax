import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-datepicker/dist/react-datepicker.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
serviceWorker.unregister();
