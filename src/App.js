import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";

import { Redirect, Route, HashRouter as Router } from "react-router-dom";

import { Config } from "@baltimorecounty/javascript-utilities";
import ConfirmationPage from "./pages/ConfirmationPage";
import ErrorPage from "./pages/ErrorPage";
import MultiPageForm from "./components/forms/MultiPageForm";
import React from "react";
import TransientTaxStepList from "./steps/TransientTaxStepList";

const { setConfig } = Config;

const localApiRoot = "//localhost:54727/api";
const testApiRoot = "http://testservices.baltimorecountymd.gov/api";
const prodApiRoot = "https://services.baltimorecountymd.gov/api";

const configValues = {
  local: {
    apiRoot: localApiRoot
  },
  development: {
    apiRoot: testApiRoot
  },
  staging: {
    apiRoot: testApiRoot
  },
  production: {
    apiRoot: prodApiRoot
  }
};

setConfig(configValues);

const App = () => (
  <div className="tt_app">
    <Router>
      <Route exact path="/">
        <Redirect to="/steps/1" />
      </Route>
      <Route
        exact
        path="/steps/:activePanel"
        render={props => (
          <MultiPageForm stepList={TransientTaxStepList} {...props} />
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
