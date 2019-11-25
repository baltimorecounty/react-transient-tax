import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

const renderErrorMessage = msg => (
  <p role="alert" className="error-message">
    {msg}
  </p>
);

const ErrorMessage = props => (
  <FormikErrorMessage {...props} render={renderErrorMessage} />
);

export default ErrorMessage;
