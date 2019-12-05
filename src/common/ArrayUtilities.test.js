import { AddOrUpdate } from "./ArrayUtilities";

describe("AddOrUpdate", () => {
  const items = [
    { id: 1, value: 1 },
    { id: 2, value: 2 }
  ];

  test("should update an existing item", () => {
    const existingObject = { id: 1, value: 2 };
    const actual = AddOrUpdate(
      [...items],
      existingObject,
      item => item.id === existingObject.id
    );
    const expected = [
      { id: 1, value: 2 },
      { id: 2, value: 2 }
    ];

    expect(actual).toEqual(expected);
  });

  test("should add a new item", () => {
    const newObject = { id: 3, value: 3 };
    const actual = AddOrUpdate(
      [...items],
      newObject,
      item => item.id === newObject.id
    );
    const expected = [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 }
    ];

    expect(actual).toEqual(expected);
  });
});
