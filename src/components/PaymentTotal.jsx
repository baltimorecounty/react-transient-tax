import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import PaymentTotalLabel from "./PaymentTotalLabel";

const PaymentTotal = props => {
  const { label, total = 0, name, className } = props;
  const cssClasses = classnames("tt_form-group total", className);

  return (
    <div className={cssClasses}>
      <label className="tt_total-label">{label}</label>
      <div className="tt_currency-pickers">
        <PaymentTotalLabel
          key={`payment-total-label-${name}`}
          name={name}
          total={total}
        />
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
