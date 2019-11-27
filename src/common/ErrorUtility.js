const ErrorPath = error =>
  `/error/${error.response ? "invalidConfirmation" : "network"} `;

export { ErrorPath };
