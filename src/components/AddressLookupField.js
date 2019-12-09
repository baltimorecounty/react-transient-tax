import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import PropTypes from "prop-types";
import { Field, connect } from "formik";
import { GetAddresses } from "../services/ApiService";
import _ from "lodash";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { name, value } = field;
  const { className, label } = props;
  const { setFieldValue, touched, errors } = form;
  const [Address, setItems] = useState([]);

  const handleChange = changeEvent => {
    const { value } = changeEvent.target;
    GetAddresses(value).then(response => {
      setItems(response);
    });
    setFieldValue("businessAddress", value);
  };

  const handleSelect = val => {
    setFieldValue("businessAddress", val);
  };

  const UpperCaseFirstLetter = (address, city, zip) => {
    return (
      _.startCase(_.camelCase(address)) +
      `, ` +
      _.startCase(_.camelCase(city)) +
      `, ` +
      _.startCase(_.camelCase(zip))
    );
  };

  const displayErrors = classes => {
    return touched[field.name] && errors[field.name]
      ? "tt_form-field tt_has-errors"
      : classes;
  };
  const items = Address.map((item, index) => ({
    id: item.Latitude + item.Longitude,
    label: UpperCaseFirstLetter(item.StreetAddress, item.City, item.Zip),
    street: item.StreetAddress,
    city: item.City,
    zip: item.Zip
  }));

  return (
    <div>
      <div className="tt_form-field__label">
        <label for={name} id="addressSearch" className={displayErrors()}>
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
            className={displayErrors("tt_form-field input")}
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
        onChange={handleChange}
        onSelect={handleSelect}
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
