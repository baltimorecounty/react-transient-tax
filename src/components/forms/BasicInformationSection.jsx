import React, { useState } from "react";
import Field from "../Field";
import AutoCompleteField from "../AutoCompleteField";
import { GetAddresses } from "../../services/ApiService";
import { ErrorPath } from "../../common/ErrorUtility";

const BasicInformationSection = ({ name, formik = {}, props }) => {
  const { values = {} } = formik;
  const [items, setItems] = useState([
    {
      id: 1,
      label: "400 washington ave, towson, 21204"
    }
  ]);

  const handleAddressChange = e => {
    const { value } = e.target;
    GetAddresses(value).then(response => {
      setItems(response);
    });
  };
  const handleAddressSelect = val => {
    console.log("testing auto complete---select");
  };

  console.log(formik);
  console.log(items);
  return (
    <div className="tt_form-section">
      <Field
        id="businessName"
        name="businessName"
        type="text"
        label="Business Name"
      />
      <AutoCompleteField
        items={items}
        formik={formik}
        name={name}
        value={values.location}
        handleAddressChange={handleAddressChange}
        handleAddressSelect={handleAddressSelect}
        label="Address"
      />

      <Field id="address" name="address" type="text" label="Address" />
      <Field id="address2" name="address2" type="text" label="Address 2" />
      <Field id="city" name="city" type="text" label="City" />
      <Field id="state" name="state" type="text" label="State" />
      <Field id="zipcode" name="zipcode" type="text" label="Zip Code" />
    </div>
  );
};

export default BasicInformationSection;
