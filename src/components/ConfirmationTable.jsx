import React from "react";

const ConfirmationTable = props => {
  const {
    TaxDetailsHeader,
    ConfirmationTableValues,
    DueDate,
    ReturnType
  } = props;

  return (
    <div>
      <h3>{TaxDetailsHeader}</h3>
      <p>
        <strong>Your Payment Plan</strong>: {ReturnType}
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
              {item.value.map(result => (
                <td key={item.id} colSpan="1" rowSpan="1">
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
