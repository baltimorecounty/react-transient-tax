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
  const { paymentInterval, label } = props;
  const { setFieldValue } = form;
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

  if (!paymentInterval) {
    return <p>Please select a payment interval before entering {label}.</p>;
  }

  return (
    <div className="tt_form-group">
      <label htmlFor="">{label}</label>
      {monthsToSelect.map((month, monthIndex) => {
        return (
          <CurrencyInput
            key={monthIndex}
            prefix="$"
            decimalSeparator="."
            thousandSeparator=","
            name={name}
            onChange={(maskedValue, valueAsNumber) =>
              handleChange(valueAsNumber, monthIndex)
            }
            value={values[monthIndex]}
          />
        );
      })}
      {form.touched[field.name] && form.errors[field.name] && (
        <div className="error">{form.errors[field.name]}</div>
      )}
    </div>
  );
};

const PaymentField = props => (
  <Field component={CustomInputComponent} {...props} />
);

export default PaymentField;
