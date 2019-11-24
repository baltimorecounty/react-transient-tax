import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import TransientTaxForm from "./components/forms/TransientTaxForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import { ConstantsProvider } from "./context/ConstantsContext";
import { Config } from "@baltimorecounty/javascript-utilities";
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
    <div className="tt_app">
      <ConstantsProvider>
        <Router>
          <Route exact path="/" component={TransientTaxForm} />
          <Route
            exact
            path="/ConfirmationPage/:confirmationNumber"
            component={ConfirmationPage}
          />
        </Router>
      </ConstantsProvider>
    </div>
  );
}

export default App;
