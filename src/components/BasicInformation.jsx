import React from "react";
import { Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { withFormik } from "formik";

const BasicInformation = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="accountNumber">Account Number</label>
      <p>
        <Field id="accountNumber" name="accountNumber" type="text" />
        <ErrorMessage name="accountNumber" />
      </p>

      <label htmlFor="businessName">Business Name</label>
      <p>
        <Field id="businessName" name="businessName" type="text" />
        <ErrorMessage name="businessName" />
      </p>

      <label htmlFor="address">Address</label>
      <p>
        <Field id="address" name="address" type="text" />
        <ErrorMessage name="address" />
      </p>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default withFormik({
  //TODO:enableReinitialize?: boolean
// TODO:Default is false. Control whether Formik should reset the form if the wrapped component props change (using deep equality).
 //TODO: enableReinitialize: true, 
  mapPropsToValues: () => ({
    accountNumber: "",
    businessName: "",
    address: ""
  }),
  validationSchema: () =>
    Yup.object().shape({
      accountNumber: Yup.string()
        .matches(/^[0-9]*$/, "it must be number only")
        .required("Required"),
      businessName: Yup.string()
        .transform(value => (!value ? null : value))
        .required("Required"),
      address: Yup.string().required("Required")
    }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }
})(BasicInformation);
