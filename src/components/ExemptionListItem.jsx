import React from "react";
import { format } from "date-fns";
import { DefaultDateFormat } from "../common/DatesUtilities";

const ExemptionListItem = props => {
  const {
    exemption,
    handleEditClick,
    handleRemoveClick,
    isSelectorFormDirty
  } = props;
  const { id, type, label, fromDate, toDate } = exemption;

  const editItem = () => {
    handleEditClick({
      id,
      type,
      label,
      fromDate,
      toDate
    });
  };

  const removeItem = () => {
    handleRemoveClick(id);
  };

  const isDisabled = isSelectorFormDirty === id;
  const cssClasses = "editButton";
  return (
    <li className="tt-exemption">
      {label} - From: {format(fromDate, DefaultDateFormat)} To:{" "}
      {format(toDate, DefaultDateFormat)}
      {handleEditClick &&
        (isDisabled === false ? (
          <button className={cssClasses} type="button" onClick={editItem}>
            {isDisabled === false ? "Edit" : "Editing..."}
          </button>
        ) : null)}
      {handleRemoveClick &&
        (isDisabled === false ? (
          <button type="button" onClick={removeItem}>
            Remove
          </button>
        ) : null)}
    </li>
  );
};

export default ExemptionListItem;
