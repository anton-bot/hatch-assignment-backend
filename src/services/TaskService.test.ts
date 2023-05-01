import TaskRepo from "../repos/TaskRepo";
import TaskService from "./TaskService";
import { createTask } from "../models/Task";

describe("TaskService", () => {
  const now = Date.now();
  beforeAll(() => {
    // Mock the database call to getAll:
    const tasks = [
      createTask("Active task 345", "1", now, false),
      createTask("Active task 200", "2", now, false),
      createTask("Done task 55", "30", now, true),
      createTask("Done task 33", "20", now, true),
    ];
    jest.spyOn(TaskRepo, "getAll").mockResolvedValue(tasks);
  });

  it("must return all tasks grouped into active/done", () => {
    const expected = {
      active: [
        createTask("Active task 200", "2", now, false),
        createTask("Active task 345", "1", now, false),
      ],
      done: [
        createTask("Done task 33", "20", now, true),
        createTask("Done task 55", "30", now, true),
      ],
    };

    expect(TaskService.getAll()).resolves.toEqual(expected);
  });
});
