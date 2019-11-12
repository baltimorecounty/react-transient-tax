import React from "react";
import ReactDOM from "react-dom";
import DateToFromSelector from "./DateToFromSelector";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DateToFromSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
