import React from "react";

const BasicErrorMessage = ({ message }) => (
  <p role="alert" className="error-message">
    {message}
  </p>
);

export default BasicErrorMessage;
