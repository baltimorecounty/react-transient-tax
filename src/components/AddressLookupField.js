import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import PropTypes from "prop-types";
import { Field, connect } from "formik";
import { GetAddresses } from "../services/ApiService";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name, value } = field;
  const { label } = props;
  const { setFieldValue, touched, errors } = form;
  const [Address, setItems] = useState([]);

  const handleAddressChange = changeEvent => {
    const { value } = changeEvent.target;
    if (value) {
      GetAddresses(value)
        .then(response => {
          setItems(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
    setFieldValue("businessAddress", value);
  };

  const handleAddressSelect = val => {
    setFieldValue("businessAddress", val);
  };

  const UpperCaseFirstLetter = value => {
    var addressPieces = value.split(" ");
    let newAddress = "";
    for (var i = 0; i < addressPieces.length; i++) {
      newAddress +=
        addressPieces[i].charAt(0).toUpperCase() +
        addressPieces[i].slice(1) +
        " ";
    }
    return newAddress;
  };

  const toggleErrorClasses = classes => {
    return touched[field.name] && errors[field.name]
      ? "tt_form-field tt_has-errors"
      : classes;
  };
  const items = Address.map((item, index) => ({
    id: item.AddressId,
    label: `${UpperCaseFirstLetter(item.StreetAddress)}${UpperCaseFirstLetter(
      item.City
    )}${item.Zip}`,
    street: item.StreetAddress,
    city: item.City,
    zip: item.Zip
  }));

  return (
    <div>
      <div className="tt_form-field__label">
        <label
          htmlFor={name}
          id="addressSearch"
          className={toggleErrorClasses()}
        >
          {label}
        </label>
      </div>
      <Autocomplete
        name={name}
        label={label}
        getItemValue={item => item.label}
        id={name}
        items={items}
        renderInput={props => (
          <input
            type="text"
            className={toggleErrorClasses("tt_form-field input")}
            {...props}
          />
        )}
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
        onChange={handleAddressChange}
        onSelect={handleAddressSelect}
        wrapperStyle={{}}
      >
        {props.children}
      </Autocomplete>

      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

const AddressLookupField = props => (
  <Field component={CustomInputComponent} {...props} />
);

AddressLookupField.propTypes = {
  /** General label to describe the input(s). */
  label: PropTypes.string.isRequired
};

export default connect(AddressLookupField);
