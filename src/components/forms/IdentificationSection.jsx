import React from "react";
import * as Yup from "yup";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field, Form, Formik } from "formik";


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
    email:Yup.string().email('Please enter a valid email address.').required('Please enter your email address.')
  });
};

const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};
const getDate = ()=>{
  let today = new Date();
  return  (today.getMonth() + 1) +'/' + today.getDate() +'/' + today.getFullYear();
}

const IdentificationSection = props => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {props => {
    
      return (
        <Form>
          <div className="tt_form-section">
            <label htmlFor="submittedBy">Return Submitted By</label>
            <label htmlFor="labelQuestion">{Labels.Question}</label>
            <label htmlFor="Date">Date:{getDate()}</label>
            <div>
              <Field id="submittedBy" name="submittedBy" type="text" />

              <ErrorMessage name="submittedBy" />
            </div>
            <label htmlFor="title">Title</label>
            <label htmlFor="labelQuestion">{Labels.Question}</label>
            <div>
              <Field id="title" name="title" type="text" />
              <ErrorMessage name="title" />
            </div>
            <label htmlFor="address">Address</label>
            <label htmlFor="labelQuestion">{Labels.Question}</label>
            <div>
              <Field id="email" name="email" type="text" />
              <ErrorMessage name="email" />
            </div>
          </div>
          <div>
            <label htmlFor="labelLegalNote">{Labels.LegalNote}</label>
          </div>
          <button type="submit">Submit</button>
        </Form>
      );
    }}
  </Formik>
);

export default IdentificationSection;
