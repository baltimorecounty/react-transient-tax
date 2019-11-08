import React from "react";
import "./App.scss";
import PaymentOptions from "./components/PaymentOptions";
import BasicInformation from "./components/BasicInformation";
import ReturnDateSelector from "./components/ReturnDateSelector";

import GrossOccupancy from "./components/GrossOccupancy";

function App() {
  return (
    <div className="tt_app">
      <header className="App-header"></header>
      <BasicInformation />
      <GrossOccupancy />
      <ReturnDateSelector intervalType="quarterly" />
      <PaymentOptions />
    </div>
  );
}

export default App;
