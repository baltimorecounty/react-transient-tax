import React from "react";
import { format } from "date-fns";
import { DefaultDateFormat } from "../common/DatesUtilities";

const ExemptionListItem = props => {
  const { exemption, handleEditClick, handleRemoveClick, isSelectorFormDirty } = props;
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

  return (
    <li className="tt-exemption">
      {label} - From: {format(fromDate, DefaultDateFormat)} To:{" "}
      {format(toDate, DefaultDateFormat)}
     {handleEditClick  && (isSelectorFormDirty !==id?
        <button type="button" onClick={editItem}>
          Edit
        </button>:null
      )}
      {handleRemoveClick && (
        <button type="button" onClick={removeItem}>
          Remove
        </button>
      )}
    </li>
  );
};

export default ExemptionListItem;
