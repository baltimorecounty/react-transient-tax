import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import TransientTaxForm from "./components/forms/TransientTaxForm";
import ConfirmationPage from "./components/forms/ConfirmationPage";
import { ConstantsProvider } from "./context/ConstantsContext";

function App() {
  return (
    <div className="tt_app">
      <ConstantsProvider>
        <Router>
          <Route exact path="/" component={TransientTaxForm} />
          <Route exact path="/ConfirmationPage" component={ConfirmationPage} />
        </Router>
      </ConstantsProvider>
    </div>
  );
}

export default App;
