import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import PropTypes from "prop-types";
import { Field, connect } from "formik";
import { GetAddresses } from "../services/ApiService";
import ErrorMessage from "./ErrorMessage";

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

  const handleAddressSelect = (value, item) => {
    setFieldValue("businessAddress", value);
    setFieldValue("businessAddressParts", item);
    setFieldValue("businessAddressId", item.id);
  };

  /**
   * Convert the first letter in a list of words separated by a give separator
   * @param {string} value string that contains spaces, Ex. washington ave
   * @param {string} separator string value for separator, Ex " ", ","
   */
  const UpperCaseFirstLetter = (value, separator = " ") =>
    value
      .split(separator)
      .map(
        addressPieces =>
          addressPieces.charAt(0).toUpperCase() + addressPieces.slice(1)
      )
      .join(" ");

  const toggleErrorClasses = classes =>
    touched[field.name] && errors[field.name]
      ? "tt_form-field tt_has-errors"
      : classes;

  const items = Address.map((item, index) => ({
    id: item.AddressId,
    label: `${UpperCaseFirstLetter(item.StreetAddress)} ${UpperCaseFirstLetter(
      item.City
    )} ${item.Zip}`,
    street: item.StreetAddress,
    city: item.City,
    zip: item.Zip
  }));

  return (
    <div className="tt_form-field">
      <div className="tt_form-field__label">
        <label
          htmlFor={name}
          id="addressSearch"
          className={toggleErrorClasses("")}
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
        <ErrorMessage name="businessAddress" component="div" />
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
