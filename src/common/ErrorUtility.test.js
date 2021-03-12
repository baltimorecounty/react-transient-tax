import { GetError } from "./ErrorUtility";

describe("GetError", () => {
  test("should return a confirmation error object", () => {
    const actual = GetError("invalidConfirmation");
    expect(actual.heading).toEqual("Invalid Confirmation Number");
  });

  test("should return a system error for any error apart from a confirmation error", () => {
    const actual = GetError("network");
    expect(actual.heading).toEqual("System Error");
  });
});
