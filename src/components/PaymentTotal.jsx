import React from "react";
import PropTypes from "prop-types";
import PaymentTotalLabel from "./PaymentTotalLabel";

const PaymentTotal = props => {
  const { label, totals = [], name } = props;

  return (
    <div className="tt_form-group total">
      <label className="tt_total-label">{label}</label>
      <div className="tt_month-pickers">
        {Object.keys(totals).map((totalKey, monthIndex) => (
          <PaymentTotalLabel
            key={`payment-total-label-${name}-${totalKey}`}
            name={name}
            monthIndex={monthIndex}
            total={totals[totalKey]}
          />
        ))}
      </div>
    </div>
  );
};

PaymentTotal.propTypes = {
  /** Label to describe the total */
  label: PropTypes.string.isRequired,
  /**  Gives a unique key to the totals */
  name: PropTypes.string.isRequired,
  /** An object that contains the totals for the specified field (see name).
   * Example: The object will contain 3 keys if the we are looking at quarterly data. */
  totals: PropTypes.object
};

export default PaymentTotal;
