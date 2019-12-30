import { AddOrUpdate } from "./ArrayUtilities";

global.console = { warn: jest.fn(), error: jest.fn() };

describe("AddOrUpdate", () => {
  const items = [
    { id: 1, value: 1 },
    { id: 2, value: 2 }
  ];

  test("should warn the user if no callback is provided", () => {
    AddOrUpdate([], {});
    expect(console.warn).toBeCalled();
  });

  test("should log error and return original array if the user doesn't provide a item to add or update", () => {
    const actual = AddOrUpdate([...items]);
    expect(console.error).toBeCalled();
    expect(actual).toEqual(items);
  });

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
