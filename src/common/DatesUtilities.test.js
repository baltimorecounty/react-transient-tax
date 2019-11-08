import { GetFormattedDueDate, GetDueDateStatus } from "./DatesUtilities";

describe("Get Formatted Due Date", () => {
  test("should return the proper due date on a normal year", () => {
    const actual = GetFormattedDueDate(new Date("January 1, 2019"));
    expect(actual).toEqual("February 28, 2019");
  });

  test("should return the proper due date on a leap year", () => {
    const actual = GetFormattedDueDate(new Date("January 1, 2020"));
    expect(actual).toEqual("February 29, 2020");
  });

  test("should return the proper due date, when the due date happens to be in the following year", () => {
    const actual = GetFormattedDueDate(new Date("December 15, 2019"));
    expect(actual).toEqual("January 31, 2020");
  });
});

describe("Get Due Date Status", () => {
  test("should past due status, when the date of filing is past than the due date", () => {
    const actual = GetDueDateStatus(
      new Date("July 1, 2019"),
      new Date("December 15, 2019")
    );
    expect(actual).toEqual({
      label: "Past Due",
      message: "4 months"
    });
  });

  test("should past due status, when the date of filing is past than the due date by 1 day", () => {
    const actual = GetDueDateStatus(
      new Date("July 1, 2019"),
      new Date("September 1, 2019")
    );
    expect(actual).toEqual({
      label: "Past Due",
      message: "1 month"
    });
  });

  test("should days remaining status, when the date of filing is before than the due date", () => {
    const actual = GetDueDateStatus(
      new Date("July 1, 2019"),
      new Date("August 15, 2019")
    );
    expect(actual).toEqual({
      label: "Days remaining until due",
      message: "16 days"
    });
  });

  test("should days remaining status, when the date of filing is before than the due date by 1 day", () => {
    const actual = GetDueDateStatus(
      new Date("July 1, 2019"),
      new Date("August 30, 2019")
    );
    expect(actual).toEqual({
      label: "Days remaining until due",
      message: "1 day"
    });
  });
});
