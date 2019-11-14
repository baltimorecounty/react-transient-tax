import React from "react";
import PropTypes from "prop-types";
import { PaymentInterval } from "../common/Constants";
import { FormatCurrency } from "../common/FormatUtilties";

const getTotalByMonth = (data, monthIndex, totalFn = total => total) =>
  totalFn(
    data.reduce(
      (sum, totals) =>
        (sum += totals && totals[monthIndex] ? totals[monthIndex] : 0),
      0
    )
  );

const PaymentTotal = props => {
  const { label, paymentInterval, data, name, totalFn } = props;
  const isMonthly =
    paymentInterval && parseInt(paymentInterval) === PaymentInterval.Monthly;
  const monthsToSelect = new Array(isMonthly ? 1 : 3).fill(
    null
  ); /** 3 months per quarter */

  return (
    <div className="tt_form-group total">
      <label className="tt_total-label">{label}</label>
      <div className="tt_month-pickers">
        {monthsToSelect.map((month, monthIndex) => {
          let total = getTotalByMonth(data, monthIndex, totalFn);
          return (
            <div
              key={`payment-total-${name}-${monthIndex}`}
              className="tt_month-picker"
            >
              <span className="tt_total">{FormatCurrency(total)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

PaymentTotal.propTypes = {
  /**
   * Each item in the array stores sum by index so that each column can be added properly.
   * Example: { 0: 25.00, 1: 50.00 }, {0: 50.00, 1: 75.00 }
   */
  data: PropTypes.array,
  /** Function to apply once the total has been calculated */
  totalFn: PropTypes.func,
  /** Label to describe the total */
  label: PropTypes.string.isRequired,
  /**  Gives a unique key to the totals */
  name: PropTypes.string.isRequired,
  /** 'monthly' or 'quarterly' constant which controls the number of total columns visible  */
  paymentInterval: PropTypes.string
};

export default PaymentTotal;
