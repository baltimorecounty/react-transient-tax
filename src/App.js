import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import TransientTaxForm from "./components/TransientTaxForm";

function App() {
  return (
    <div className="tt_app">
      <Router>
        <Route exact path="/" component={TransientTaxForm} />
      </Router>
    </div>
  );
}

export default App;
