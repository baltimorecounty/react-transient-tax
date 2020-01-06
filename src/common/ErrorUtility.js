const ErrorPath = error =>
  `/error/${error.response ? "invalidConfirmation" : "network"}`;

/**
 * Get a heading and message for a given error type
 * @param {string} errorType type of error
 */
const GetError = (errorType = "") => {
  switch (errorType.toLowerCase()) {
    case "invalidconfirmation": {
      return {
        heading: "Invalid Confirmation Number",
        message:
          "The confirmation number provided in the url is invalid. Please double check your confirmation email for the link to your Transient Tax Return details."
      };
    }
    default: {
      return {
        heading: "System Error",
        message:
          "The system has encountered an error. Please wait a few minutes and try again."
      };
    }
  }
};

export { ErrorPath, GetError };
