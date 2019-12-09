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
