import React from "react";

const ErrorPage = props => {
  const { errorType = 0 } = props.match.params;

  const getErrorMessage = errorType => {
    switch (errorType) {
      case "invalidconfirmation": {
        return "This is an incorrect confirmation number";
      }
      case "noresponse": {
        return "The server is not responding please contact magic people for assistance";
      }
      default: {
        return "Something went wrong";
      }
    }
  };

  return <p>{getErrorMessage(errorType)}</p>;
};

export default ErrorPage;
