import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TransientTaxTabs from "../TransientTaxTabs";
import ExemptionCertificateField from "./ExemptionCertificateField";

const ExemptionCertificateForm4 = props => {
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
      initialValues={{ email: "" }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
      })}
    >
      {props => (
        <Form>
          <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
          <h2>{label}</h2>
          <div className="form-1">
            <ExemptionCertificateField />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default ExemptionCertificateForm4;
