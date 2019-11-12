import React from "react";
import ReactDOM from "react-dom";
import ExemptionCertificate from "./ExemptionCertificate";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExemptionCertificate />, div);
  ReactDOM.unmountComponentAtNode(div);
});
