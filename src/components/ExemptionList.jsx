import React from "react";
import ExemptionListItem from "./ExemptionListItem";

const ExemptionsList = ({ exemptions = [], ...rest }) => (
  <ul className="tt_exemptions">
    <h3>Exemptions</h3>
    {exemptions.map(exemption => (
      <ExemptionListItem key={exemption.id} exemption={exemption} {...rest} />
    ))}
  </ul>
);

export default ExemptionsList;
