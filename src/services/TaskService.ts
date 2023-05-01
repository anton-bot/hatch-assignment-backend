import TaskRepo from "../repos/TaskRepo";
import { Task } from "../models/Task";
import { RouteError } from "../other/RouteError";
import { StatusCodes } from "http-status-codes";
import { GroupedTasks } from "../types/GroupedTasks";
import { separateTasks } from "../tasks/separateTasks";
import { sortAndTruncateTasks } from "../tasks/sortAndTruncateTasks";
import { filterTasks } from "../tasks/filterTasks";

async function getAll(filter?: string): Promise<GroupedTasks> {
  const tasks = await TaskRepo.getAll();
  const filteredTasks = filterTasks(tasks, filter);
  const activeAndDone = separateTasks(filteredTasks);
  return sortAndTruncateTasks(activeAndDone);
}

function create(task: Task): Promise<void> {
  return TaskRepo.create(task);
}

async function update(task: Task): Promise<void> {
  const exists = await TaskRepo.exists(task.id);
  if (!exists) {
    throw new RouteError(StatusCodes.NOT_FOUND, `Task not found`);
  }

  return TaskRepo.update(task);
}

async function remove(id: string): Promise<void> {
  const exists = await TaskRepo.exists(id);
  if (!exists) {
    throw new RouteError(StatusCodes.NOT_FOUND, "Task not found");
  }

  return TaskRepo.remove(id);
}

export default {
  getAll,
  create,
  update,
  remove,
} as const;
