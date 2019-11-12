import { ParseCurrency } from "./ParseCurrency";

describe("Remove special characters from value", () => {
  test("should return a float instead of a string", () => {
    const actual = ParseCurrency("$123,456.78");
    expect(actual).toEqual(123456.78);
  });
});
