import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import TransientTaxFormPage from "./pages/TransientTaxFormPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { Config } from "@baltimorecounty/javascript-utilities";
import ErrorPage from "./pages/ErrorPage";
const { setConfig } = Config;

const configValues = {
  local: {
    apiRoot: "//localhost:54727/api/transientTax",
    gisApiRoot: "http://localhost:54727/api/gis/addressLookup/"
  },
  development: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api/transientTax",
    gisApiRoot:
      "https://testservices.baltimorecountymd.gov/api/gis/addressLookup/"
  },
  staging: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api/transientTax",
    gisApiRoot:
      "https://testservices.baltimorecountymd.gov/api/gis/addressLookup/"
  },
  production: {
    apiRoot: "http://services.baltimorecountymd.gov/api/transientTax",
    gisApiRoot: "https://services.baltimorecountymd.gov/api/gis/addressLookup/"
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
