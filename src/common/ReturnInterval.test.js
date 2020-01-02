import { GetMonths, GetStatus } from "./ReturnInterval";

describe("GetMonths", () => {
  test("should return any empty object if not date is specified", () => {
    const actual = GetMonths(null, false);

    expect(actual).toEqual({});
  });

  test("should return the object with one property if a monthly submission", () => {
    const date = new Date(2019, 1, 1);
    const actual = GetMonths(date, false);

    expect(actual).toEqual({
      0: date
    });
  });

  test("should return the object with 3 properties if a quarterly submission", () => {
    const date = new Date(2019, 1, 1);
    const actual = GetMonths(date, true);

    expect(actual).toEqual({
      0: date,
      1: new Date(2019, 2, 1),
      2: new Date(2019, 3, 1)
    });
  });
});

describe("GetStatus", () => {
  test("should return an empty object if not months are specified", () => {
    const actual = GetStatus();
    expect(actual).toEqual({});
  });
});
