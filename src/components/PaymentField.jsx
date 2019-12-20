import { Field, connect } from "formik";
import React, { useState } from "react";

import CurrencyInput from "./CurrencyInput";
import ErrorMessage from "./ErrorMessage";
import PaymentLabel from "./PaymentLabel";
import PropTypes from "prop-types";
import classnames from "classnames";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name } = field;
  const { className, isNegativeValue, label } = props;
  const { setFieldValue } = form;
  const [value, setValue] = useState();
  const cssClasses = classnames(
    "tt_form-group flex-end total input",
    className
  );

  const handleChange = formattedNumber => {
    const { valueAsNumber } = formattedNumber.target;
    setValue(!valueAsNumber ? undefined : Math.abs(valueAsNumber));
    setFieldValue(
      name,
      !valueAsNumber ? 0 : isNegativeValue ? -valueAsNumber : valueAsNumber
    );
  };

  return (
    <div className={cssClasses}>
      <PaymentLabel label={label} />
      <div className="tt_currency-pickers">
        <div className="tt_currency-picker">
          <CurrencyInput
            isNegativeValue={isNegativeValue}
            id={name}
            name={name}
            onChange={handleChange}
            value={value || ""}
          />
          <ErrorMessage name={name} />
        </div>
      </div>
    </div>
  );
};

const PaymentField = props => (
  <Field component={CustomInputComponent} {...props} />
);

PaymentField.propTypes = {
  /** Determines if the input should be treated as a negative or positive currency. */
  isNegativeValue: PropTypes.bool,
  /** General label to describe the input(s). */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default connect(PaymentField);
