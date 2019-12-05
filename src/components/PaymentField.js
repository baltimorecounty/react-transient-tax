import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Field, connect } from "formik";
import CurrencyInput from "react-currency-input";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name } = field;
  const {
    className,
    isNegativeValue,
    label
    // buildMonthLabel = () => {}
  } = props;
  const { setFieldValue, touched, errors } = form;
  const [value, setValue] = useState(0);
  const cssClasses = classnames("tt_form-group flex-end total", className);

  const handleChange = (formattedNumber, valueAsNumber) => {
    setValue(valueAsNumber);
    setFieldValue(name, value);
  };

  const inputName = `${name}-test`;
  const inputValue = value ? Math.abs(value) : 0;

  return (
    <div className={cssClasses}>
      <label>{label}</label>
      <div className="tt_currency-pickers">
        <div className="tt_currency-picker" key={inputName}>
          <CurrencyInput
            prefix={`${isNegativeValue ? "-" : ""}$`}
            decimalSeparator="."
            thousandSeparator=","
            allowNegative={true}
            id={inputName}
            name={inputName}
            onChange={handleChange}
            value={inputValue}
          />
          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentField = props => (
  <Field component={CustomInputComponent} {...props} />
);

PaymentField.propTypes = {
  /**
   * Function to handle building the label for the actual input(s) based on dynamic data.
   * Passes "monthIndex" as a param.
   */
  buildMonthLabel: PropTypes.func,
  /** Determines if the input should be treated as a negative or positive currency. */
  isNegativeValue: PropTypes.bool,
  /** General label to describe the input(s). */
  label: PropTypes.string.isRequired,
  /** Unique name to describe the field, in order to ensure the form works properly. */
  name: PropTypes.string.isRequired,
  /** 'monthly' or 'quarterly' constant which controls the number of total columns visible  */
  monthToReport: PropTypes.object
};

export default connect(PaymentField);
