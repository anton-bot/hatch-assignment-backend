import TaskRepo from "../repos/TaskRepo";
import TaskService from "./TaskService";
import { Task, createTask } from "../models/Task";

describe("TaskService - getAll", () => {
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

  it("must return all tasks grouped into active/done", async () => {
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

    await expect(TaskService.getAll()).resolves.toEqual(expected);
  });
});

describe("TaskService - create", () => {
  it("must create a task with the given label", async () => {
    const mockedFn = jest
      .spyOn(TaskRepo, "create")
      .mockImplementation(async () => "mock" as unknown as Task);

    const taskRequest = { label: "New Task 123" };
    await expect(TaskService.create(taskRequest)).resolves.toBeDefined();

    const generatedTask = mockedFn.mock.calls[0][0];
    expect(generatedTask.label).toBe("New Task 123");
    expect(generatedTask.id).toHaveLength(36);
    expect(generatedTask.timestamp).toBeLessThanOrEqual(Date.now());
    expect(generatedTask.done).toBe(false);
  });
});
