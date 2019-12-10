import React from "react";
import PropTypes from "prop-types";

const ReturnSummary = props => {
  const { header, values = [], dueDate, returnType, dateSubmitted } = props;

  return (
    <div>
      <h3>{header}</h3>
      <p>
        <strong>Your Payment Plan</strong>: {returnType}
      </p>
      {dateSubmitted && (
        <p>
          <strong>Date Submitted</strong>: {dateSubmitted}
        </p>
      )}
      <p>
        <strong>Due Date</strong>: {dueDate}
      </p>
      <table align="left" cellPadding="1" cellSpacing="1" id="BACO_table">
        <tbody>
          {values.map((item, itemIndex) => (
            <tr key={item.id}>
              <td colSpan="1" rowSpan="1">
                <p>
                  <strong>{item.key}</strong>
                </p>
              </td>
              {console.log(item) ||
                item.value.map((result, resultIndex) => {
                  const isFirstRow = itemIndex === 0;
                  const isLastCell =
                    itemIndex === values.length - 1 &&
                    resultIndex === item.value.length - 1;
                  return (
                    <td
                      key={`table-total-${item.id}-${resultIndex}`}
                      colSpan="1"
                      rowSpan="1"
                    >
                      {isFirstRow || isLastCell ? (
                        <p>
                          <strong>{result}</strong>
                        </p>
                      ) : (
                        <p>{result}</p>
                      )}
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReturnSummary.propTypes = {
  /** Headline for the summary */
  header: PropTypes.string,
  /**  A list of key / value pairs with summaries data by month */
  values: PropTypes.array,
  /** Due date of the return */
  dueDate: PropTypes.string,
  /** String return type for the return (Monthly or Quarterly) */
  returnType: PropTypes.string,
  /** Date of return submission */
  dateSubmitted: PropTypes.string
};

export default ReturnSummary;
