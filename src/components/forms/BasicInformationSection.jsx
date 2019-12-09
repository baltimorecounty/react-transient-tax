import React, { useState } from "react";
import Field from "../Field";
import AddressLookupField from "../AddressLookupField";
import { GetAddresses } from "../../services/ApiService";
import _ from "lodash";

const BasicInformationSection = ({ name, formik = {}, props }) => {
  const { values = {} } = formik;

  const [Address, setItems] = useState([]);

  const handleAddressChange = e => {
    const { value } = e.target;

    GetAddresses(value).then(response => {
      setItems(response);
    });
  };

  const handleAddressSelect = val => {
    const splitAddress = val.split(",");
    formik.setFieldValue("address", splitAddress[0]);
    formik.setFieldValue("city", splitAddress[1]);
    formik.setFieldValue("zipcode", splitAddress[2]);
    formik.setFieldValue("location", "");
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
    <div className="tt_form-section">
      <Field
        id="businessName"
        name="businessName"
        type="text"
        label="Business Name"
      />

      <label id="address">Address Search:</label>

      <AddressLookupField
        items={items}
        formik={formik}
        name={name}
        value={values.location}
        handleAddressChange={handleAddressChange}
        handleAddressSelect={handleAddressSelect}
        label="Address"
      />

      {formik.values.address !== "" ? (
        <div>
          <br></br>
          <label id="businessaddress">Business Address</label>
          <div>
            <label id="address">Address: {formik.values.address}</label>
          </div>
          {formik.values.address2 ? (
            <div>
              <label id="address2">Address2: {formik.values.address2}</label>
            </div>
          ) : null}
          <div>
            <label id="city">City: {formik.values.city}</label>
          </div>
          <div>
            <label id="state">State: MD</label>
          </div>
          <div>
            <label id="zip">Zip Code: {formik.values.zipcode}</label>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BasicInformationSection;
