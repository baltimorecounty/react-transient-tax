import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

const renderErrorMessage = msg => (
  <p role="alert" class="error-message">
    {msg}
  </p>
);

const ErrorMessage = props => (
  <FormikErrorMessage {...props} render={renderErrorMessage} />
);

export default ErrorMessage;
