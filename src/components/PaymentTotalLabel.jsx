import React from "react";
import { connect } from "formik";
import { FormatCurrency } from "../common/FormatUtilities";

const getTotalByMonth = (data, monthIndex, totalFn = total => total) =>
  totalFn(
    data.reduce(
      (sum, totals) =>
        (sum += totals && totals[monthIndex] ? totals[monthIndex] : 0),
      0
    )
  );

const PaymentTotalLabel = props => {
  const { name, monthIndex, data, totalFn, formik } = props;
  let total = getTotalByMonth(data, monthIndex, totalFn);
  return (
    <div
      key={`payment-total-${name}-${monthIndex}`}
      className="tt_month-picker"
    >
      <span className="tt_total">{FormatCurrency(total)}</span>
    </div>
  );
};

export default connect(PaymentTotalLabel);
