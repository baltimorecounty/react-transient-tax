import React from "react";
import Autocomplete from "react-autocomplete";

const AutoCompleteField = props => {
  const {
    items,
    formik,
    handleAddressChange,
    handleAddressSelect,
    value
  } = props;

  const handleChange = changeEvent => {
    const { value } = changeEvent.target;
    formik.setFieldValue("location", value);
    handleAddressChange(changeEvent);
  };

  const handleSelect = val => {
    formik.setFieldValue("location", val);
    handleAddressSelect(val);
  };

  return (
    <Autocomplete
      name="location"
      label="Address"
      getItemValue={item => item.label}
      id="location-autocomplete-input"
      items={items}
      placeholder="123 Amazing St"
      renderInput={props => <input className="autocomplete-input" {...props} />}
      renderItem={(item, isHighlighted) => (
        <div
          key={item.id}
          className={`autocomplete-option ${
            isHighlighted ? "is-highlighted" : ""
          }`}
        >
          {item.label}
        </div>
      )}
      renderMenu={(items, value, style) => (
        <div
          className="autocomplete-results"
          style={{ ...style }}
          children={items}
        />
      )}
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      wrapperStyle={{}}
    >
      {props.children}
    </Autocomplete>
  );
};

export default AutoCompleteField;
