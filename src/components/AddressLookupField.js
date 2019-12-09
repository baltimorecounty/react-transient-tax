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
  const { name } = field;
  const { className, label, value } = props;
  const { setFieldValue, touched, errors } = form;
  const [Address, setItems] = useState([]);

  const handleChange = changeEvent => {
    const { value } = changeEvent.target;
    GetAddresses(value).then(response => {
      setItems(response);
    });
  };

  const handleSelect = val => {
    const splitAddress = val.split(",");
    val.setFieldValue("address", splitAddress[0]);
    val.setFieldValue("city", splitAddress[1]);
    val.setFieldValue("zipcode", splitAddress[2]);
    setFieldValue(name, val);
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

  const items = Address.map((item, index) => ({
    id: item.Latitude + item.Longitude,
    label: UpperCaseFirstLetter(item.StreetAddress, item.City, item.Zip),
    street: item.StreetAddress,
    city: item.City,
    zip: item.Zip
  }));

  return (
    <div>
      <label id="address">{label}</label>
      <Autocomplete
        name={name}
        label={label}
        getItemValue={item => item.label}
        id="location-autocomplete-input"
        items={items}
        renderInput={props => (
          <input className="autocomplete-input" {...props} />
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
    </div>
  );
};

const AddressLookupField = props => (
  <Field component={CustomInputComponent} {...props} />
);

AddressLookupField.propTypes = {
  /** Determines if the input should be treated as a negative or positive currency. */
  isNegativeValue: PropTypes.bool,
  /** General label to describe the input(s). */
  label: PropTypes.string.isRequired
};

export default connect(AddressLookupField);
