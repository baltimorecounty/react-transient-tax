import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";
import BasicErrorMessage from "../BasicErrorMessage";

const renderErrorMessage = message => <BasicErrorMessage message={message} />;

const ErrorMessage = props => (
  <FormikErrorMessage {...props} render={renderErrorMessage} />
);

export default ErrorMessage;
