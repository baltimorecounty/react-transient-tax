import React from "react";

const ErrorPage = ({ heading, message }) => (
  <div className="tt_error_container">
    <h2>{heading}</h2>
    <p>{message}</p>
  </div>
);

export default ErrorPage;
