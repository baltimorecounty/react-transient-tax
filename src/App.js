import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import TransientTaxForm from "./components/forms/TransientTaxForm";
import ConfirmationForm from "./components/forms/ConfirmationForm";

function App() {
  return (
    <div className="tt_app">
      <Router>
        <Route exact path="/" component={TransientTaxForm} />
        <Route exact path="/ConfirmationForm" component={ConfirmationForm} />
      </Router>
    </div>
  );
}

export default App;
