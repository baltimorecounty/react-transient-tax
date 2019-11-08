import { GetDueDate } from "./DatesUtilities";

describe("Get Due Date", () => {
  test("should return the proper due date on a normal year", () => {
    const actual = GetDueDate(new Date("January 1, 2019"));
    expect(actual).toEqual("February 28, 2019");
  });

  test("should return the proper due date on a leap year", () => {
    const actual = GetDueDate(new Date("January 1, 2020"));
    expect(actual).toEqual("February 29, 2020");
  });

  test("should return the proper due date, when the due date happens to be in the following year", () => {
    const actual = GetDueDate(new Date("Decemeber 15, 2019"));
    expect(actual).toEqual("January 31, 2020");
  });
});
