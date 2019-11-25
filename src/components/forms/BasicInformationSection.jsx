import React from "react";
import Field from "../Field";
import InformationModal from "../InformationModal";

const BasicInformationSection = props => (
  <div className="tt_form-section">
    <Field
      id="accountNumber"
      name="accountNumber"
      type="text"
      label="Account Number"
      style={{ width: "200px" }}
    />
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
