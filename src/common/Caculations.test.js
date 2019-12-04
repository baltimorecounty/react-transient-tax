import { CalculateInterest, CalculatePenalty } from "./Calculations";

describe("Interest Calculation", () => {
  test("should return the proper calculation when passed valid data based on the default interest rate of 1", () => {
    const actual = CalculateInterest(100, 2, 0.1);
    expect(actual).toEqual(21);
  });

  test("should return the proper calculation when passed valid data based on the default interest rate of 1", () => {
    const actual = CalculateInterest(100, 4, 0.1);
    expect(actual).toEqual(46.41);
  });

  test("should return zero if the payment is still considered on time", () => {
    const actual = CalculateInterest(100, 0, 0.1);
    expect(actual).toEqual(0);
  });
});

describe("Penalty Calculation", () => {
  test("should return the proper penalty based on the default penalty fee of 10%", () => {
    const actual = CalculatePenalty(100);
    expect(actual).toEqual(10);
  });
});
