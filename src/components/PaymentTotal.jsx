import React from "react";
import PropTypes from "prop-types";
import PaymentTotalLabel from "./PaymentTotalLabel";

const PaymentTotal = props => {
  const { label, monthsToReport = {}, data, name, totalFn } = props;

  return (
    <div className="tt_form-group total">
      <label className="tt_total-label">{label}</label>
      <div className="tt_month-pickers">
        {Object.keys(monthsToReport).map((month, monthIndex) => (
          <PaymentTotalLabel
            key={`payment-total-label-${name}-${monthIndex}`}
            name={name}
            monthIndex={monthIndex}
            data={data}
            totalFn={totalFn}
          />
        ))}
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
  monthsToReport: PropTypes.object
};

export default PaymentTotal;
