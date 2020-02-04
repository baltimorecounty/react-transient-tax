import { DefaultDateFormat } from "../common/DatesUtilities";
import React from "react";
import { format } from "date-fns";

const ExemptionListItem = props => {
  const {
    exemption,
    handleEditClick,
    handleRemoveClick,
    isSelectorFormDirty
  } = props;
  const {
    id,
    type,
    label,
    fromDate,
    toDate,
    isDateRangeAtLeast90days
  } = exemption;

  const editItem = () => {
    handleEditClick({
      id,
      type,
      label,
      fromDate,
      toDate,
      isDateRangeAtLeast90days
    });
  };

  const removeItem = () => {
    handleRemoveClick(id);
  };

  const isDisabled = isSelectorFormDirty === id;
  const cssClasses = "editButton";
  const cssExemptionClasses = `tt_exemption ${!isDisabled ? "" : "tt-color"}`;
  return (
    <li className={cssExemptionClasses}>
      <span>
        {label} - From: {format(fromDate, DefaultDateFormat)} To:{" "}
        {format(toDate, DefaultDateFormat)}
      </span>
      <div>
        {handleEditClick &&
          (!isDisabled ? (
            <button className={cssClasses} type="button" onClick={editItem}>
              Edit
            </button>
          ) : null)}
        {handleRemoveClick &&
          (!isDisabled ? (
            <button type="button" className="removeButton" onClick={removeItem}>
              Remove
            </button>
          ) : null)}
        {isDisabled && <span className="tt_is-editing">Editing...</span>}
      </div>
    </li>
  );
};

export default ExemptionListItem;
