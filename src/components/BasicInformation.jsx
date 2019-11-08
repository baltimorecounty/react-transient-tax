import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues={

  accountNumber: "",
  businessName: "",
  address: ""
}
const validationSchema = () => {
  return Yup.object().shape({
    accountNumber: Yup.string()
      .matches(/^[0-9]*$/, "it must be number only")
      .required("Required"),
    businessName: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    address: Yup.string().required("Required")
  });
};

const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const BasicInformation = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {props => {
        return (
          <Form>
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
      }}
    </Formik>
  );
};
export default BasicInformation;
