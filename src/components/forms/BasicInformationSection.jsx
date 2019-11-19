import React from "react";
import { ErrorMessage, Field } from "formik";

const BasicInformationSection = props => (
  <div className="tt_form-section">
    {/* Basic Information Section */}
    <label htmlFor="accountNumber">Account Number</label>
    <div>
      <Field id="accountNumber" name="accountNumber" type="text" />
      <ErrorMessage name="accountNumber" />
    </div>
    <label htmlFor="businessName">Business Name</label>
    <div>
      <Field id="businessName" name="businessName" type="text" />
      <ErrorMessage name="businessName" />
    </div>
    <label htmlFor="address">Address</label>
    <div>
      <Field id="address" name="address" type="text" />
      <ErrorMessage name="address" />
    </div>
  </div>
);

export default BasicInformationSection;
