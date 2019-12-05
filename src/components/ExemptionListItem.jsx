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
  const cssExemptionClasses =`tt-exemption ${!isDisabled ? '': 'tt-color'}`;
  return (
    <li className={cssExemptionClasses}>
      {label} - From: {format(fromDate, DefaultDateFormat)} To:{" "}
      {format(toDate, DefaultDateFormat)}
      {handleEditClick &&
        (!isDisabled ? (
          <button className={cssClasses} type="button" onClick={editItem}>
            Edit
          </button>
        ) : null)}
      {handleRemoveClick &&
        (!isDisabled ? (
          <button type="button" onClick={removeItem}>
            Remove
          </button>
        ) : null)}
      {isDisabled && <span className="tt_is-editing">Editing...</span>}
    </li>
  );
};

export default ExemptionListItem;
