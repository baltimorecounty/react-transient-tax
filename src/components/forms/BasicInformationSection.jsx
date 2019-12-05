import React from "react";
import Field from "../Field";
import AutoCompleteField from "../AutoCompleteField";

const BasicInformationSection = ({
  name,
  formik = {},
  items,
  handleAddressChange,
  handleAddressSelect
}) => {
  const { values = {} } = formik;

  return (
    <div className="tt_form-section">
      <Field
        id="businessName"
        name="businessName"
        type="text"
        label="Business Name"
      />
      {/* <AutoCompleteField
        items={items}
        formik={formik}
        name={name}
        value={values.location}
        onChange={handleAddressChange}
        onSelect={handleAddressSelect}
        label = "Address"
      /> */}

      <Field id="address" name="address" type="text" label="Address" />
      <Field id="address2" name="address2" type="text" label="Address 2" />
      <Field id="city" name="city" type="text" label="City" />
      <Field id="state" name="state" type="text" label="State" />
      <Field id="zipcode" name="zipcode" type="text" label="Zip Code" />
    </div>
  );
};

export default BasicInformationSection;
