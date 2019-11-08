import { GetDueDate } from "./DatesUtilities";

describe("Get Due Date", () => {
  test("should return February 28th for a January return", () => {
    const actual = GetDueDate(new Date("January 1, 2019"));
    expect(actual).toEqual("February 28, 2019");
  });
});
