import React from "react";
import { format } from "date-fns";
import { DefaultDateFormat } from "../common/DatesUtilities";

const ExemptionListItem = props => {
  const { label, fromDate, toDate } = props;

  return (
    <li className="tt-exemption">
      {label} - From: {format(fromDate, DefaultDateFormat)} To:{" "}
      {format(toDate, DefaultDateFormat)}
    </li>
  );
};

const ExemptionsList = props => {
  const { exemptions = [] } = props;

  return (
    <ul className="tt_exemptions">
      <h3>Exemptions</h3>
      {exemptions.map((exemption, exemptionIndex) => (
        <ExemptionListItem key={exemptionIndex} {...exemption} />
      ))}
    </ul>
  );
};

export default ExemptionsList;
