import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TransientTaxTabs from "../../components/TransientTaxTabs";
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
            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default Form1;
