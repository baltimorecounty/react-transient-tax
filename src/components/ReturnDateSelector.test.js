import React from "react";
import ReactDOM from "react-dom";
import ReturnInterval from "./ReturnInterval";

it("renders a monthly component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReturnInterval intervalType="monthly" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a quarterly component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReturnInterval intervalType="quarterly" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
