import { Form, Formik } from "formik";

import PromptIfDirty from "../PromptIfDirty";
import React from "react";

const FormikSubForm = props => {
  const {
    children,
    initialValues,
    onSubmit,
    validationSchema,
    nextButton,
    prevButton
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {props => (
        <Form>
          <PromptIfDirty />
          {children(props)}
          <div className="tt_form-controls">
            {nextButton}
            {prevButton}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormikSubForm;
