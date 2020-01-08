import {
  GetDueDateStatus,
  GetFormattedDueDate,
  GetMaxExemptionEndDate,
  GetMinExemptionStartDate
} from "./DatesUtilities";

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
  test("should past due status, when the date of filing is past than the due date by 1 day", () => {
    const actual = GetDueDateStatus(
      new Date("August 1, 2019"),
      new Date("October 1, 2019")
    );
    expect(actual).toEqual(
      expect.objectContaining({
        isLate: true,
        value: 1,
        dateType: "month",
        label: "Past Due",
        message: "1 month"
      })
    );
  });

  test("should past due status, when the date of filing is at then end of a month with 30 days", () => {
    const actual = GetDueDateStatus(
      new Date("August 1, 2019"),
      new Date("November 30, 2019")
    );
    expect(actual).toEqual(
      expect.objectContaining({
        isLate: true,
        value: 2,
        dateType: "month",
        label: "Past Due",
        message: "2 months"
      })
    );
  });

  test("should past due status, when the date of filing is at then end of a month with 31 days", () => {
    const actual = GetDueDateStatus(
      new Date("August 1, 2019"),
      new Date("December 31, 2019")
    );
    expect(actual).toEqual(
      expect.objectContaining({
        isLate: true,
        value: 3,
        dateType: "month",
        label: "Past Due",
        message: "3 months"
      })
    );
  });

  test("should days remaining status, when the date of filing is before than the due date", () => {
    const actual = GetDueDateStatus(
      new Date("July 1, 2019"),
      new Date("August 15, 2019")
    );
    expect(actual).toEqual(
      expect.objectContaining({
        isLate: false,
        value: 16,
        dateType: "day",
        label: "Days remaining until due",
        message: "16 days"
      })
    );
  });

  test("should days remaining status, when the date of filing is before than the due date by 1 day", () => {
    const actual = GetDueDateStatus(
      new Date("July 1, 2019"),
      new Date("August 30, 2019")
    );
    expect(actual).toEqual(
      expect.objectContaining({
        isLate: false,
        value: 1,
        dateType: "day",
        label: "Days remaining until due",
        message: "1 day"
      })
    );
  });
});

describe("Get Min Date", () => {
  test("should return the first month with an exemption", () => {
    const actual = GetMinExemptionStartDate([
      {
        month: 10,
        year: 2019,
        governmentExemptRentalCollected: 0,
        nonTransientRentalCollected: 0
      },
      {
        month: 11,
        year: 2019,
        governmentExemptRentalCollected: -1,
        nonTransientRentalCollected: 0
      },
      {
        month: 12,
        year: 2019,
        governmentExemptRentalCollected: 0,
        nonTransientRentalCollected: -10
      }
    ]);

    expect(actual).toEqual(new Date(2019, 10, 1)); // November 1, 2019
  });
});

describe("Get Max Date", () => {
  test("should return the last month with an exemption", () => {
    const actual = GetMaxExemptionEndDate([
      {
        month: 10,
        year: 2019,
        governmentExemptRentalCollected: 0,
        nonTransientRentalCollected: 0
      },
      {
        month: 11,
        year: 2019,
        governmentExemptRentalCollected: -1,
        nonTransientRentalCollected: 0
      },
      {
        month: 12,
        year: 2019,
        governmentExemptRentalCollected: 0,
        nonTransientRentalCollected: -10
      }
    ]);

    expect(actual.toLocaleDateString()).toEqual(
      new Date(2019, 11, 31).toLocaleDateString()
    ); // December 31, 2019
  });
});
