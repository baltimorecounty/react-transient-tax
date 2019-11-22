import React from "react";
import { GetFormatedDateTime } from "../common/DatesUtilities";

const ConfirmationTable = props => {
  const {
    TaxDetailsHeader,
    ConfirmationTableValues,
    DueDate,
    ReturnType,
    DateSubmitted
  } = props;

  return (
    <div>
      <h3>{TaxDetailsHeader}</h3>
      <p>
        <strong>Your Payment Plan</strong>: {ReturnType}
      </p>
      <p>
        <strong>Date Submitted</strong>:{" "}
        {GetFormatedDateTime(new Date(DateSubmitted), "MMMM dd, yyyy")}
      </p>
      <p>
        <strong>Due Date</strong>: {DueDate}
      </p>
      <table align="left" cellPadding="1" cellSpacing="1" id="BACO_table">
        <tbody>
          {ConfirmationTableValues.map(item => (
            <tr key={item.id}>
              <td colSpan="1" rowSpan="1">
                <p>
                  <strong>{item.key}</strong>
                </p>
              </td>
              {item.value.map((result, resultIndex) => (
                <td
                  key={`table-total-${item.id}-${resultIndex}`}
                  colSpan="1"
                  rowSpan="1"
                >
                  <p>{result}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmationTable;
