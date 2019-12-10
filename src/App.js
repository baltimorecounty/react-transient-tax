import { Config } from "@baltimorecounty/javascript-utilities";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import MultiPageForm from "./components/forms/MultiPageForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import ErrorPage from "./pages/ErrorPage";
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

const App = () => (
  <div className="tt_app">
    <Router>
      <Route
        exact
        path="/"
        render={props => (
          <MultiPageForm {...props} stepList={TransientTaxStepList} />
        )}
      />
      <Route
        exact
        path="/confirmation/:confirmationNumber"
        component={ConfirmationPage}
      />
      <Route exact path="/error/:errorType" component={ErrorPage} />
    </Router>
  </div>
);

export default App;
