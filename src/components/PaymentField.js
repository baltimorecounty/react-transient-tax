import React, { useEffect, useState } from "react";
import { Field } from "formik";
import CurrencyInput from "react-currency-input";
import { PaymentInterval } from "../common/Constants";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name } = field;
  const {
    isNegativeValue,
    paymentInterval,
    label,
    buildMonthLabel = () => {}
  } = props;
  const { setFieldValue, touched, errors } = form;
  const [values, setValues] = useState({});
  const isMonthly =
    paymentInterval && parseInt(paymentInterval) === PaymentInterval.Monthly;
  const monthsToSelect = new Array(isMonthly ? 1 : 3).fill(
    null
  ); /** 3 months per quarter */

  const handleChange = (valueAsNumber, monthIndex) => {
    setValues({ ...values, ...{ [monthIndex]: valueAsNumber } });
  };

  useEffect(() => {
    setFieldValue(name, values);
  }, [name, values, setFieldValue]);

  return (
    <div className="tt_form-group flex-end">
      <label>{label}</label>
      <div className="tt_month-pickers">
        {monthsToSelect.map((month, monthIndex) => {
          const inputName = `${name}-${monthIndex}`;
          const inputValue = values[monthIndex]
            ? Math.abs(values[monthIndex])
            : 0;

          return (
            <div className="tt_month-picker" key={inputName}>
              <label htmlFor={inputName}>{buildMonthLabel(monthIndex)}</label>
              <CurrencyInput
                prefix={`${isNegativeValue ? "-" : ""}$`}
                decimalSeparator="."
                thousandSeparator=","
                allowNegative={true}
                id={inputName}
                name={inputName}
                onChange={(maskedValue, valueAsNumber) =>
                  handleChange(valueAsNumber, monthIndex)
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

export default PaymentField;
