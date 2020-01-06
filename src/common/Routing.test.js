import { GetQueryParam } from "./Routing";

describe("GetQueryParam", () => {
  test("should return null if match is empty", () => {
    const actual = GetQueryParam();
    expect(actual).toEqual(null);
  });

  test("should return value for valid key and match", () => {
    const actual = GetQueryParam(
      {
        params: {
          error: "really bad"
        }
      },
      "error"
    );
    expect(actual).toEqual("really bad");
  });
});
