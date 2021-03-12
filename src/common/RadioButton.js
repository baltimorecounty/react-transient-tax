import React from "react";

const RadioButton = ({
  field: { name, value, onChange },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className="tt_field--radio dg_radio">
      <input
        name={name}
        className="dg_radio-input"
        id={id}
        type="radio"
        value={value}
        onChange={onChange}
        {...props}
      />
      <label className="dg_label dg_radio-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export { RadioButton };
