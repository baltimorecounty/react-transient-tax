import ErrorMessage from "./ErrorMessage";
import { Field as FormikField } from "formik";
import React from "react";

const Field = (props) => {
  const { autoFocus, name, type, id, label, infoComponent, ...rest } = props;

  return (
    <FormikField name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        const cssClasses =
          meta.error && meta.touched
            ? "dg_label-text tt_has-errors"
            : "dg_label-text";

        return (
          <div className="dg_form-field" {...rest}>
            {label && (
              <div className="dg_label">
                <label htmlFor={id} className={cssClasses}>
                  {label}
                </label>
                {infoComponent}
              </div>
            )}
            <input
              type={type}
              id={id}
              className={cssClasses}
              autoFocus={autoFocus}
              {...field}
            />
            <ErrorMessage name={name} />
          </div>
        );
      }}
    </FormikField>
  );
};

export default Field;
