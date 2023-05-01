import { tasks } from "../tests/mocks/tasks";
import { filterTasks } from "./filterTasks";

describe("filterTasks", () => {
  const filteredTasks = filterTasks(tasks, "2");
  const nonFilteredTasks = filterTasks(tasks, undefined);

  it('must only contain tasks with "2" in label', () => {
    expect(filteredTasks.every((task) => task.label.includes("2"))).toBe(true);
  });

  it("must not contain tasks with other labels", () => {
    expect(filteredTasks.length).toBeLessThan(tasks.length);
  });

  it("must not filter if filter is empty", () => {
    expect(nonFilteredTasks).toEqual(tasks);
  });
});
