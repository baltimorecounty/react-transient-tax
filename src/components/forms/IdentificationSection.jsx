import React from "react";
import * as Yup from "yup";
import { format } from "date-fns";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field, Form, Formik } from "formik";

import reactDateTime from "./react-datetime";

const initialValues = {
  submittedBy: "",
  title: "",
  email: ""
};

const validationSchema = () => {
  return Yup.object().shape({
    submittedBy: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    title: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    email: Yup.string().required("Required")
  });
};

const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const TransientTaxForm = props => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {props => {
      const { values } = props;

      return (
        <Form>
          <div className="tt_form-section">
            <label htmlFor="submittedBy">Return Submitted By</label>
            <label htmlFor="submittedBy">{Labels.Question}</label>
            <label htmlFor="Date">Date:{<reactDateTime/>}</label>
            <div>
              <Field id="submittedBy" name="submittedBy" type="text" />

              <ErrorMessage name="submittedBy" />
            </div>
            <label htmlFor="title">Title</label>
            <label htmlFor="submittedBy">{Labels.Question}</label>
            <div>
              <Field id="title" name="title" type="text" />
              <ErrorMessage name="title" />
            </div>
            <label htmlFor="address">Address</label>
            <label htmlFor="submittedBy">{Labels.Question}</label>
            <div>
              <Field id="email" name="email" type="text" />
              <ErrorMessage name="email" />
            </div>
          </div>
          <div>
            <label htmlFor="submittedBy">{Labels.LegalNote}</label>
          </div>
          <button type="submit">Submit</button>
        </Form>
      );
    }}
  </Formik>
);

export default TransientTaxForm;
