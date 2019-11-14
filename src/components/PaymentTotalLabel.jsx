import React from "react";
import { FormatCurrency } from "../common/FormatUtilities";
import { CalculateTotalByMonth } from "../common/Calculations";

const PaymentTotalLabel = props => {
  const { name, monthIndex, data, totalFn } = props;
  let total = CalculateTotalByMonth(data, monthIndex, totalFn);
  return (
    <div
      key={`payment-total-${name}-${monthIndex}`}
      className="tt_month-picker"
    >
      <span className="tt_total">{FormatCurrency(total)}</span>
    </div>
  );
};

export default PaymentTotalLabel;
