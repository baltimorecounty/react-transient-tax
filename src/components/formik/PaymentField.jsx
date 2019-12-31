import { Field, connect } from "formik";
import React, { useState } from "react";

import CurrencyInput from "../CurrencyInput";
import ErrorMessage from "./ErrorMessage";
import PaymentLabel from "../PaymentLabel";
import PropTypes from "prop-types";
import classnames from "classnames";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name } = field;
  const { className, isNegativeValue, label, value: valueFromProps } = props;
  const month = props.date.getMonth();
  const { setFieldValue } = form;
  const [value, setValue] = useState(Math.abs(valueFromProps));
  const cssClasses = classnames(
    "tt_form-group flex-end total input",
    className
  );

  const handleChange = formattedNumber => {
    /** IE 11 valueAsNumber does not work, so we have to use the string "value" from the target */
    const { value, valueAsNumber } = formattedNumber.target;
    const currencyValue = valueAsNumber || parseFloat(value);

    setValue(!currencyValue ? undefined : Math.abs(currencyValue));
    setFieldValue(
      name,
      !currencyValue ? 0 : isNegativeValue ? -currencyValue : currencyValue
    );
  };

  return (
    <div className={cssClasses}>
      <PaymentLabel label={label} />
      <div className="tt_currency-pickers">
        <div className="tt_currency-picker">
          <CurrencyInput
            isNegativeValue={isNegativeValue}
            id={`${name}-${month}`}
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
