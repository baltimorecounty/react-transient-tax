import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Field } from "formik";
import CurrencyInput from "./CurrencyInput";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name } = field;
  const {
    className,
    isNegativeValue,
    monthsToReport = {},
    label
    // buildMonthLabel = () => {}
  } = props;
  const { setFieldValue, touched, errors } = form;
  const [values, setValues] = useState({});
  const cssClasses = classnames("tt_form-group flex-end total", className);

  const handleChange = (changeEvent, monthIndex) => {
    const valueAsNumber =
      parseFloat(changeEvent.target.value) * (isNegativeValue ? -1 : 1) || 0;
    setValues({ ...values, ...{ [monthIndex]: valueAsNumber } });
  };

  useEffect(() => {
    setFieldValue(name, values);
  }, [name, values, setFieldValue]);

  return (
    <div className={cssClasses}>
      <label>{label}</label>
      <div className="tt_currency-pickers">
        {monthsToReport &&
          Object.keys(monthsToReport).map((month, monthIndex) => {
            const inputName = `${name}-${monthIndex}`;
            const inputValue = values[monthIndex]
              ? Math.abs(values[monthIndex])
              : 0;

            return (
              <div className="tt_currency-picker" key={inputName}>
                {/* Disabled for now until we confirm the final design */}
                {/* <label htmlFor={inputName}>{buildMonthLabel(monthIndex)}</label> */}
                <CurrencyInput
                  isNegativeValue={isNegativeValue}
                  id={inputName}
                  name={inputName}
                  onChange={changeEvent =>
                    handleChange(changeEvent, monthIndex)
                  }
                  value={inputValue}
                />
                {touched[field.name] && errors[field.name] && (
                  <div className="error">{errors[field.name]}</div>
                )}
              </div>
            );
          })}
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

export default PaymentField;
