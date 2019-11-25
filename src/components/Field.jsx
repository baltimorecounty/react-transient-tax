import React from "react";
import { Field as FormikField } from "formik";

const Field = props => {
  const { name, type, id } = props;
  return (
    <FormikField name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta
      }) => {
        const cssClasses = meta.error && meta.touched ? "tt_has-errors" : "";
        return <input type={type} id={id} className={cssClasses} {...field} />;
      }}
    </FormikField>
  );
};

export default Field;
