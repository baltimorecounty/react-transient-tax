import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import Field from "../Field";
import * as Yup from "yup";

const Form1 = props => {
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
            <ErrorMessage name="businessName" component="div" />
            <Field id="address" name="address" type="text" label="Address" />
            <ErrorMessage name="address" component="div" />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default Form1;
