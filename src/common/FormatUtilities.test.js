import { FormatCurrency } from "./FormatUtilties";

describe("Format Currency", () => {
  test("should return the proper format for a large currency value", () => {
    const actual = FormatCurrency(1111111.111);
    expect(actual).toEqual("$1,111,111.11");
  });

  test("should return the proper format for a large negative currency value", () => {
    const actual = FormatCurrency(-1111111.111);
    expect(actual).toEqual("-$1,111,111.11");
  });
});
