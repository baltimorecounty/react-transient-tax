import React from "react";
import "./App.scss";
import ReturnInterval from "./components/ReturnInterval";

function App() {
  return (
    <div className="tt_app">
      <ReturnInterval intervalType="quarterly" />
    </div>
  );
}

export default App;
