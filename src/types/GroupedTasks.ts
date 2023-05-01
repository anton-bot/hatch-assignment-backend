import { Task } from "../models/Task";

export type GroupedTasks = {
  active: Task[];
  done: Task[];
};
