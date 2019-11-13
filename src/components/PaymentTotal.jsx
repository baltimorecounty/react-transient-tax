import React from "react";
import { PaymentInterval } from "../common/Constants";

const getTotalByMonth = (data, monthIndex) => {
  return data.reduce(
    (sum, totals) =>
      totals && totals[monthIndex] ? (sum += totals[monthIndex]) : 0,
    0
  );
};

const PaymentTotal = props => {
  const { label, paymentInterval, data, name } = props;
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
          const total = getTotalByMonth(data, monthIndex);
          return (
            <div
              key={`payment-total-${name}-${monthIndex}`}
              className="tt_month-picker"
            >
              <span className="tt_total">${total.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentTotal;
