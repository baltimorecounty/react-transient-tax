import { ErrorMessage, Field } from "formik";

import React from "react";
import ReactDatePicker from "react-datepicker";

const DatePicker = ({
  field: { name, value }, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { selectedValue, onChange = value => value, ...rest } = props;

  const handleChange = date => {
    setFieldValue(name, date);
    onChange(date);
  };

  return (
    <div>
      <label htmlFor={name}>From: </label>
      <ReactDatePicker
        id={name}
        name={name}
        selected={selectedValue || value}
        onChange={handleChange}
        {...rest}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

const DatePickerField = props => <Field component={DatePicker} {...props} />;

export default DatePickerField;
