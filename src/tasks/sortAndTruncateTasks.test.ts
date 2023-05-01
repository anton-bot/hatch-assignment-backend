import { tasks } from "../tests/mocks/tasks";
import { separateTasks } from "./separateTasks";
import { sortAndTruncateTasks } from "./sortAndTruncateTasks";

describe("sortAndTruncateTasks", () => {
  const separatedTasks = separateTasks(tasks);
  const sortedTasks = sortAndTruncateTasks(separatedTasks);

  it("must group tasks and truncate completed tasks to 10", () => {
    expect(sortedTasks.active).toHaveLength(20);
    expect(sortedTasks.done).toHaveLength(10);
  });

  it("must not modify existing arrays", () => {
    expect(sortedTasks).not.toBe(separatedTasks);
    expect(sortedTasks.active).not.toBe(separatedTasks.active);
    expect(sortedTasks.done).not.toBe(separatedTasks.done);
  });

  it("must sort tasks by label ascending", () => {
    const firstActiveTask = sortedTasks.active[0].label;
    const lastActiveTask = sortedTasks.active.at(-1)?.label ?? "";
    expect(firstActiveTask < lastActiveTask).toBe(true);

    const firstDoneTask = sortedTasks.done[0].label;
    const lastDoneTask = sortedTasks.done.at(-1)?.label ?? "";
    expect(firstDoneTask < lastDoneTask).toBe(true);
  });

  it("must return latest completed tasks", () => {
    const doneTimestamps = separatedTasks.done.map((task) => task.timestamp);
    const earliestDone = Math.min(...doneTimestamps);
    const allTasksAreLatest = sortedTasks.done.every(
      (t) => t.timestamp > earliestDone
    );
    expect(allTasksAreLatest).toBe(true);
  });
});
