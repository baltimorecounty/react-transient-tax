import React from "react";
import PropTypes from "prop-types";
import { FormatCurrency } from "../common/FormatUtilities";

const PaymentTotalLabel = props => {
  const { name, total = 0 } = props;
  return (
    <div key={`payment-total-${name}`} className="tt_currency-picker">
      <span className="tt_total">{FormatCurrency(total)}</span>
    </div>
  );
};

PaymentTotalLabel.propTypes = {
  /** Helps uniquely identify this component along with monthIndex */
  name: PropTypes.string.isRequired,
  /** Total as a number to display */
  total: PropTypes.number
};

export default PaymentTotalLabel;
