import { Task } from "../models/Task";
import { GroupedTasks } from "../types/GroupedTasks";

export const separateTasks = (tasks: Task[]): GroupedTasks => {
  return tasks.reduce<GroupedTasks>(
    (data, task) => {
      if (task.done) {
        data.done.push(task);
      } else {
        data.active.push(task);
      }
      return data;
    },
    { active: [], done: [] }
  );
};
