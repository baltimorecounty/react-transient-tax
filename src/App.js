import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import TransientTaxFormPage from "./pages/TransientTaxFormPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { Config } from "@baltimorecounty/javascript-utilities";
import ErrorPage from "./pages/ErrorPage";
const { setConfig } = Config;

const localApiRoot = "//localhost:54727/api/";
const testApiRoot = "http://testservices.baltimorecountymd.gov/api/";
const prodApiRoot = "http://services.baltimorecountymd.gov/api/";

const configValues = {
  local: {
    apiRoot: localApiRoot + "transientTax",
    gisApiRoot: testApiRoot + "gis/addressLookup/"
  },
  development: {
    apiRoot: testApiRoot + "transientTax",
    gisApiRoot: testApiRoot + "gis/addressLookup/"
  },
  staging: {
    apiRoot: testApiRoot + "transientTax",
    gisApiRoot: testApiRoot + "gis/addressLookup/"
  },
  production: {
    apiRoot: prodApiRoot + "transientTax",
    gisApiRoot: prodApiRoot + "gis/addressLookup/"
  }
};

setConfig(configValues);
function App() {
  return (
    <div className="tt_app">
      <Router>
        <Route exact path="/" component={TransientTaxFormPage} />
        <Route
          exact
          path="/confirmation/:confirmationNumber"
          component={ConfirmationPage}
        />
        <Route exact path="/error/:errorType" component={ErrorPage} />
      </Router>
    </div>
  );
}

export default App;
