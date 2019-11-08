import React from "react";
import "./App.scss";
import PaymentOptions from "./components/PaymentOptions";
import BasicInformation from "./components/BasicInformation";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BasicInformation />
      <PaymentOptions />
    </div>
  );
}

export default App;
