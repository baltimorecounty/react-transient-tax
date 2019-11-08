import React from "react";

export const RadioButton = ({
  field: { name, value, onChange, onClick },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={value}
        onChange={onChange}
        onClick={onClick}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
