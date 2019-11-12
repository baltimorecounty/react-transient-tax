import React from "react";
import ReactDOM from "react-dom";
import DateRangeSelector from "./DateRangeSelector";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DateRangeSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
