import React from "react";
import ReactDOM from "react-dom";
import ExemptionSelector from "./ExemptionSelector";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExemptionSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
