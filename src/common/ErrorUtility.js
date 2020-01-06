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
          "You have provided an invalid confirmation number. Please try submitting your Transient Occupancy Tax Return again. "
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
