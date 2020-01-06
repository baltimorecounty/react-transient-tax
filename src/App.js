import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";

import { Redirect, Route, HashRouter as Router } from "react-router-dom";

import { Config } from "@baltimorecounty/javascript-utilities";
import ConfirmationPage from "./pages/ConfirmationPage";
import ErrorPage from "./pages/ErrorPage";
import { GetError } from "./common/ErrorUtility";
import { GetQueryParam } from "./common/Routing";
import MultiPageForm from "./components/MultiPageForm";
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
        <Redirect to="/steps/basic-information" />
      </Route>
      <Route
        exact
        path="/steps/:stepId"
        render={props => (
          <MultiPageForm stepList={TransientTaxStepList} {...props} />
        )}
      />
      <Route
        exact
        path="/confirmation/:confirmationNumber"
        component={ConfirmationPage}
      />
      <Route
        exact
        path="/error/:errorType"
        render={({ match = {} }) => {
          const errorType = GetQueryParam(match, "errorType");
          const { heading, message } = GetError(errorType);
          return <ErrorPage heading={heading} message={message} />;
        }}
      />
    </Router>
  </div>
);

export default App;
