import { Task } from "../models/Task";
import { byLabelIncludes } from "../utils/byLabelIncludes";

export const filterTasks = (tasks: Task[], filter: string | undefined) => {
  return filter
    ? tasks.filter(byLabelIncludes(filter.toLocaleLowerCase()))
    : tasks;
};
