import { Field } from "formik";
import { PaymentDirections } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";
import React from "react";

const PaymentOptions = ({
  field: { name }, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { items = [], onChange = () => {} } = props;

  const handleChange = changeEvent => {
    const { value } = changeEvent.target;
    setFieldValue(name, value);
    onChange(value);
  };

  return (
    <React.Fragment>
      <label htmlFor={name} className="tt_label">
        {PaymentLabel}
      </label>
      {items.map(({ Id: key, Description: value }) => (
        <Field
          key={key}
          component={RadioButton}
          name={name}
          id={`${name}-${key}`}
          label={value}
          value={key}
          onChange={handleChange}
        />
      ))}
      <p>{PaymentNote}</p>
    </React.Fragment>
  );
};

const PaymentOptionsField = props => (
  <Field component={PaymentOptions} {...props} />
);

export default PaymentOptionsField;
