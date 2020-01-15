import React, { useState } from "react";

import AddressLookupDebouncedInput from "../AddressLookupDebouncedInput";
import Autocomplete from "react-autocomplete";
import ErrorMessage from "./ErrorMessage";
import { Field } from "formik";
import { GetAddresses } from "../../services/ApiService";
import PropTypes from "prop-types";

const CustomInputComponent = ({
  field: { name, value }, // { name, value, onChange, onBlur }
  form: { setFieldValue, touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { label, minLength = 0, onChange = () => {} } = props;
  const [Address, setItems] = useState([]);
  const [wasSelected, setWasSelected] = useState(false);

  const handleAddressChange = changeEvent => {
    onChange(changeEvent);
    /** HACK - Ensure Address is not triggered on first re-render,
     * so we can populate initial values, without setting the from to dirty. */
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    const { value } = changeEvent.target;
    const shouldTriggerLookup = value && value.length > minLength;

    if (shouldTriggerLookup) {
      GetAddresses(value)
        .then(response => {
          setItems(response);
        })
        .catch(error => {
          console.error(error);
        });
    }

    /**
     * HACK - This ensures that our debounced input, knows the difference between when something is selected
     * and when the value is just a change event. Otherwise we can't properly set the values.
     */
    if (wasSelected) {
      setWasSelected(false);
    } else {
      setFieldValue("businessAddress", value);
      setFieldValue("address", {});
    }
  };

  const handleAddressSelect = (value, item) => {
    setFieldValue("businessAddress", value);
    setFieldValue("address", item);
    setWasSelected(true);
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
    touched[name] && errors[name] ? "tt_form-field tt_has-errors" : classes;

  const items = Address.map(
    ({ label, StreetAddress, City, Zip, ...rest }, index) => ({
      label: `${UpperCaseFirstLetter(StreetAddress)} ${UpperCaseFirstLetter(
        City
      )} ${Zip}`,
      street: StreetAddress,
      city: City,
      zip: Zip,
      ...rest
    })
  );

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
          <AddressLookupDebouncedInput
            defaultValue={value}
            className={toggleErrorClasses("tt_form-field input")}
            wasSelected={wasSelected}
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
      <ErrorMessage name={name} />
    </div>
  );
};

const AddressLookupField = props => (
  <Field component={CustomInputComponent} {...props} />
);

AddressLookupField.propTypes = {
  /** General label to describe the input(s). */
  label: PropTypes.string.isRequired,
  /** The minimum character length needed before triggering autocomplete suggestions. */
  minLength: PropTypes.number
};

export default AddressLookupField;
