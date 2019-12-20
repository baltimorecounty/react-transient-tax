import PaymentLabel from "./PaymentLabel";
import PaymentTotalLabel from "./PaymentTotalLabel";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

const PaymentTotal = props => {
  const { label, total = 0, name, className } = props;
  const cssClasses = classnames("tt_form-group total", className);

  console.log(label);

  return (
    <div className={cssClasses}>
      <PaymentLabel label={label} />
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
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  /**  Gives a unique key to the totals */
  name: PropTypes.string.isRequired,
  /** Total value */
  total: PropTypes.number
};

export default PaymentTotal;
