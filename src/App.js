import React from "react";
import "./App.scss";
import PaymentOptions from "./components/PaymentOptions";
import BasicInformation from "./components/BasicInformation";
import ReturnDateSelector from "./components/ReturnDateSelector";

function App() {
  return (
    <div className="tt_app">
      <header className="App-header"></header>
      <BasicInformation />
      <ReturnDateSelector intervalType="quarterly" />
      <PaymentOptions />
    </div>
  );
}

export default App;
