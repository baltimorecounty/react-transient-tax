import { GetDueDate } from "./DatesUtilities";

describe("Get Due Date", () => {
  test("should return February 28th for a January return", () => {
    const returnDate = new Date("January 1, 2019");
    const actual = GetDueDate(returnDate);
    const expected = new Date("February 28, 2019");
    expect(actual).toEqual(expected);
  });
});
