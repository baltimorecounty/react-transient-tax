/**
 * Adds or updates a list of items
 * @param {Array} items list of objects. Object must contain
 * @param {object} savedItem the new or updated object to be added or updated inside the list of items
 * @param {string} idKey unique identifier for the objects contained in the list of items
 */
const AddOrUpdate = (items, savedItem, idKey = "id") => {
  const existingIndex = items.findIndex(
    items => items[idKey] === savedItem[idKey]
  );

  // Replace Existing Item
  if (existingIndex > -1) {
    items.splice(existingIndex, 1, savedItem);
    return [...items];
  }

  // Add New Item
  return [...items, savedItem];
};

export { AddOrUpdate };
