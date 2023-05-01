import { Task } from "../models/Task";

export const byLabelIncludes = (filter: string) => (task: Task) =>
  task.label.toLowerCase().includes(filter);
