import { GetError } from "../common/ErrorUtility";
import { GetQueryParam } from "../common/Routing";
import React from "react";

const ErrorPage = ({ match = {} }) => {
  const errorType = GetQueryParam(match, "errorType");
  const { heading, message } = GetError(errorType);

  return (
    <div className="tt_error_container">
      <h2>{heading}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
