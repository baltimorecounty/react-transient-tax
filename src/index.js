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

const configValues = {
  local: {
    apiRoot: "//localhost:54727/api/transientTax"
  },
  development: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api/transientTax"
  },
  staging: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api/transientTax"
  },
  production: {
    apiRoot: "http://services.baltimorecountymd.gov/api/transientTax"
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
