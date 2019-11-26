const ErrorPath = error => {
  if (error.response) {
    return "/error/invalidconfirmation";
  } else {
    return "/error/noresponse";
  }
};

export { ErrorPath };
