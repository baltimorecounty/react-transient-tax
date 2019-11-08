import React from "react";
import ReactDOM from "react-dom";
import ReturnDateSelector from "./ReturnDateSelector";

it("renders a monthly component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReturnDateSelector intervalType="monthly" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a quarterly component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReturnDateSelector intervalType="quarterly" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
