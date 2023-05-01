import { isValidTaskRequest } from "./TaskRequest";

describe("isValidTaskRequest", () => {
  it("must return true for valid TaskRequest", () => {
    const validTaskRequest = {
      label: "valid task request",
    };

    expect(isValidTaskRequest(validTaskRequest)).toBe(true);
  });

  it("must return false for invalid TaskRequest", () => {
    const invalidTaskRequest = {
      label: " ",
    };

    expect(isValidTaskRequest(invalidTaskRequest)).toBe(false);
  });

  it("must return false for non-objects", () => {
    const nonTaskRequests = [null, undefined, "string", NaN];

    nonTaskRequests.forEach((r) => expect(isValidTaskRequest(r)).toBe(false));
  });
});
