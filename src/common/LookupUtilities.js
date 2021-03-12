/**
 * Get Id for Lookup Item based on the description
 * @param {Array} values list of lookup up item Example item: { Id: 1, Description: "Monthly "}
 * @param {string} description value of the "description" to return
 */
const GetIdByDescription = (values = [], description = "") =>
  values.length > 0
    ? values.find(
        ({ Description = "" }) =>
          Description.toLowerCase() === description.toLowerCase()
      ).Id
    : 0;

export { GetIdByDescription };
