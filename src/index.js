import { Config } from "@baltimorecounty/javascript-utilities";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom";
import "./App.scss";
import MultiPageForm from "./components/forms/MultiPageForm";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import TransientTaxStepList from "./steps/TransientTaxStepList";

const { setConfig } = Config;

const localApiRoot = "//localhost:54727/api/";
const testApiRoot = "http://testservices.baltimorecountymd.gov/api/";
const prodApiRoot = "https://services.baltimorecountymd.gov/api/";

const configValues = {
  local: {
    apiRoot: `${localApiRoot}transientTax`,
    gisApiRoot: `${localApiRoot}gis/addressLookup`
  },
  development: {
    apiRoot: `${testApiRoot}transientTax`,
    gisApiRoot: `${testApiRoot}gis/addressLookup`
  },
  staging: {
    apiRoot: `${testApiRoot}transientTax`,
    gisApiRoot: `${testApiRoot}gis/addressLookup`
  },
  production: {
    apiRoot: `${prodApiRoot}transientTax`,
    gisApiRoot: `${prodApiRoot}gis/addressLookup`
  }
};

setConfig(configValues);

function App() {
  return (
    <div className="App">
      <MultiPageForm stepList={TransientTaxStepList} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
serviceWorker.unregister();
