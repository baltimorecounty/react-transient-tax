import React from "react";

const ConfirmationTable = props => {
  const { TaxDetailsHeader, ConfirmationGridValues } = props;

  return (
    <div>
      <h3>{TaxDetailsHeader}</h3>
      <table align="left" cellPadding="1" cellSpacing="1" id="BACO_table">
        <tbody>
          {ConfirmationGridValues.map(item => (
            <tr>
              <td colSpan="1" rowSpan="1">
                <p>
                  <strong>{item.key}</strong>
                </p>
              </td>
              <td colSpan="1" rowSpan="1">
                <p>{item.value}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmationTable;
