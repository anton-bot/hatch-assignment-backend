import { taskRouter } from "./api";

describe("taskRouter", () => {
  it("must have 4 routes", () => {
    expect(taskRouter.stack.length).toBe(4);
  });
});
