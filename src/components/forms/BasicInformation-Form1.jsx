import React from "react";
import { Formik, Form } from "formik";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import Field from "../Field";
import AddressLookupField from "../AddressLookupField";

import * as Yup from "yup";

const BasicInformationForm1 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    label
  } = props;

  return (
    <Formik
      initialValues={{ businessName: "", businessAddress: "" }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        businessAddress: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required")
      })}
    >
      {props => (
        <Form>
          <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
          <h2>{label}</h2>
          <div className="tt_form-section">
            <Field
              id="businessName"
              name="businessName"
              type="text"
              label="Business Name"
            />
            <AddressLookupField
              id="businessAddress"
              name="businessAddress"
              label="Business Address"
            />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default BasicInformationForm1;
