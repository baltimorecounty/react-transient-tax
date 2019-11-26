import React from "react";
import { Field as FormikField } from "formik";
import ErrorMessage from "./ErrorMessage";

const Field = props => {
  const { name, type, id, label, infoComponent, ...rest } = props;
  return (
    <FormikField name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta
      }) => {
        const cssClasses = meta.error && meta.touched ? "tt_has-errors" : "";
        return (
          <div className="tt_form-field" {...rest}>
            {label && (
              <div className="tt_form-field__label">
                <label htmlFor={id} className={cssClasses}>
                  {label}
                </label>
                {infoComponent}
              </div>
            )}
            <input type={type} id={id} className={cssClasses} {...field} />
            <ErrorMessage name={name} />
          </div>
        );
      }}
    </FormikField>
  );
};

export default Field;
