import ErrorMessage from "./ErrorMessage";
import { Field } from "formik";
import PropTypes from "prop-types";
import { RadioButton } from "../common/RadioButton";
import React from "react";

const RadioButtonList = ({
  field: { name }, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { items = [], label, note, onChange = () => {} } = props;

  const handleChange = changeEvent => {
    const { value } = changeEvent.target;
    setFieldValue(name, value);
    onChange(value);
  };

  return (
    <div className="tt_formik-field">
      <label htmlFor={name} className="tt_label">
        {label}
      </label>
      {items.map(({ Id, Description }) => (
        <Field
          key={Id}
          component={RadioButton}
          name={name}
          id={`${name}-${Id}`}
          label={Description}
          value={Id}
          onChange={handleChange}
        />
      ))}
      <ErrorMessage name="paymentInterval" />
      {note && <p className="tt_note">{note}</p>}
    </div>
  );
};

const RadioButtonListField = props => (
  <Field component={RadioButtonList} {...props} />
);

RadioButtonListField.propTypes = {
  /** Unique name to group the radio buttons. */
  name: PropTypes.string.isRequired,
  /** Label to describe the different radio buttons */
  label: PropTypes.string.isRequired,
  /** List of objects that contain an Id, Description. Id will be the value, Description will be the label */
  items: PropTypes.array.isRequired,
  /** Function that passes back the value of the checked input. */
  onChange: PropTypes.func
};

export default RadioButtonListField;
