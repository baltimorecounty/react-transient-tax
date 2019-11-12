import React from "react";
import { format } from "date-fns";
import { DefaultDateFormat } from "../common/DatesUtilities";

const ExemptionListItem = props => {
  const {
    exemptionId,
    label,
    fromDate,
    toDate,
    handleEditClick,
    handleRemoveClick
  } = props;

  const removeItem = () => {
    handleRemoveClick(exemptionId);
  };

  return (
    <li className="tt-exemption">
      {label} - From: {format(fromDate, DefaultDateFormat)} To:{" "}
      {format(toDate, DefaultDateFormat)}
      {handleEditClick && (
        <button type="button" onClick={handleEditClick}>
          Edit
        </button>
      )}
      {handleRemoveClick && (
        <button type="button" onClick={removeItem}>
          Remove
        </button>
      )}
    </li>
  );
};

const ExemptionsList = props => {
  const { exemptions = [], ...rest } = props;

  return (
    <ul className="tt_exemptions">
      <h3>Exemptions</h3>
      {exemptions.map((exemption, exemptionIndex) => (
        <ExemptionListItem
          key={exemptionIndex}
          exemptionId={exemptionIndex}
          {...exemption}
          {...rest}
        />
      ))}
    </ul>
  );
};

export default ExemptionsList;
