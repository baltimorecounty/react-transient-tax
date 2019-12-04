import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TransientTaxTabs from "../TransientTaxTabs";
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
      initialValues={{ businessName: "", address: "" }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        address: Yup.string().required("Required")
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

            <Field id="address" name="address" type="text" label="Address" />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default BasicInformationForm1;
