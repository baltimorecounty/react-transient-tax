/**
 * Adds or updates a list of items
 * @param {Array} items list of objects. Object must contain
 * @param {object} savedItem the new or updated object to be added or updated inside the list of items
 * @param {function} callback A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * @return {Array} new array of with the added or updated item
 */
const AddOrUpdate = (items = [], savedItem = {}, callback = () => {}) => {
  const arr = [...items];
  const existingIndex = arr.findIndex(callback);

  // Replace Existing Item
  if (existingIndex > -1) {
    arr.splice(existingIndex, 1, savedItem);
    return [...arr];
  }

  // Add New Item
  return [...arr, savedItem];
};

export { AddOrUpdate };
