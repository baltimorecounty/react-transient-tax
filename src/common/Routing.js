/**
 * Gets query param value for a given match (react-router)
 * @param {object} match object react router provides for query params
 * @param {string} key query param key of the value you wish to retrieve
 */
const GetQueryParam = (match = {}, key = "") => {
  const { params = {} } = match;
  return params[key] ? params[key].trim() : null;
};

export { GetQueryParam };
