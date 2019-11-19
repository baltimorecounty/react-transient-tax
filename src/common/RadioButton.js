import React from "react";

const RadioButton = ({
  field: { name, value, onChange },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className="tt_field--radio">
      <input
        name={name}
        id={id}
        type="radio"
        value={value}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export { RadioButton };
