import React, { useEffect, useState } from "react";

import { GetFilingTypes } from "../services/ApiService";
import { GetFormatedDateTime } from "../common/DatesUtilities";
import PropTypes from "prop-types";

const ReturnSummary = props => {
  const {
    header,
    values = [],
    dueDate,
    returnType,
    dateSubmitted,
    paymentInterval,
    businessName
  } = props;
  const [filingType, setFilingType] = useState(returnType);

  useEffect(() => {
    GetFilingTypes().then(filingTypes => {
      if (paymentInterval) {
        const filingType = filingTypes.find(
          x => x.Id === parseInt(paymentInterval)
        );
        setFilingType(filingType.Description);
      }
    });
  }, [paymentInterval]);

  return (
    <div>
      <h3>{header}</h3>
      {businessName && (
        <p>
          <strong>Business Name</strong>: {businessName}
        </p>
      )}
      {filingType && (
        <p>
          <strong>Your Payment Plan</strong>: {filingType}
        </p>
      )}
      {dateSubmitted && (
        <p>
          <strong>Date Submitted</strong>: {dateSubmitted}
        </p>
      )}
      {dueDate && (
        <p>
          <strong>Due Date</strong>: {GetFormatedDateTime(dueDate)}
        </p>
      )}
      <table align="left" cellPadding="1" cellSpacing="1" id="BACO_table">
        <tbody>
          {values.map((item, itemIndex) => (
            <tr key={item.id}>
              <td colSpan="1" rowSpan="1">
                <p>
                  <strong>{item.key}</strong>
                </p>
              </td>
              {item.value.map((result, resultIndex) => {
                const isFirstRow = itemIndex === 0;
                const isLastCell =
                  itemIndex === values.length - 1 &&
                  resultIndex === item.value.length - 1;
                const { formatFn = x => x } = item;
                const itemText = formatFn(result);
                return (
                  <td
                    key={`table-total-${item.id}-${resultIndex}`}
                    colSpan="1"
                    rowSpan="1"
                  >
                    {isFirstRow || isLastCell ? (
                      <p>
                        <strong>{itemText}</strong>
                      </p>
                    ) : (
                      <p>{itemText}</p>
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
  dueDate: PropTypes.instanceOf(Date),
  /** String return type for the return (Monthly or Quarterly) */
  returnType: PropTypes.string,
  /** Date of return submission */
  dateSubmitted: PropTypes.string,
  /** Payment Interval as denoted by its id, used to look up the friendly value */
  paymentInterval: PropTypes.number
};

export default ReturnSummary;
