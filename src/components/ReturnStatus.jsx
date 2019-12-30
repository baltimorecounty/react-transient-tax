import { GetFormatedDateTime } from "../common/DatesUtilities";
import { Labels } from "../common/Constants";
import React from "react";

const ReturnStatus = ({ dueDate, label, message }) => {
  const formattedDueDate = GetFormatedDateTime(dueDate);
  return (
    <div className="tt_form-group">
      <p>
        <span className="emphasize-text">{Labels.DueDate}</span>:{" "}
        {formattedDueDate}
      </p>
      <p>
        {label === Labels.PastDue && (
          <i
            className="fas fa-exclamation-circle tt_past-due-icon"
            aria-hidden="true"
          ></i>
        )}
        <span>{label}</span>: {message}
      </p>
    </div>
  );
};

export default ReturnStatus;
