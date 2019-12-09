import React from "react";
import Field from "../Field";

const BasicInformationSection = props => (
  <div className="tt_form-section">
    <Field
      id="businessName"
      name="businessName"
      type="text"
      label="Business Name"
    />
    <Field id="address" name="address" type="text" label="Address" />
  </div>
);

export default BasicInformationSection;
