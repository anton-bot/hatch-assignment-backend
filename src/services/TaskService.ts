import TaskRepo from "../repos/TaskRepo";
import { Task, createTask } from "../models/Task";
import { RouteError } from "../other/RouteError";
import { StatusCodes } from "http-status-codes";
import { GroupedTasks } from "../types/GroupedTasks";
import { separateTasks } from "../tasks/separateTasks";
import { sortAndTruncateTasks } from "../tasks/sortAndTruncateTasks";
import { filterTasks } from "../tasks/filterTasks";
import { TaskRequest } from "src/types/TaskRequest";

async function getAll(filter?: string): Promise<GroupedTasks> {
  const tasks = await TaskRepo.getAll();
  const filteredTasks = filterTasks(tasks, filter);
  const activeAndDone = separateTasks(filteredTasks);
  return sortAndTruncateTasks(activeAndDone);
}

function create(tr: TaskRequest): Promise<Task> {
  const newTask = createTask(tr.label);
  return TaskRepo.create(newTask);
}

async function markDone(id: string, done: boolean): Promise<Task> {
  const task = await TaskRepo.getOne(id);
  if (!task) {
    throw new RouteError(StatusCodes.NOT_FOUND, `Task not found`);
  }
  task.done = done;
  const updated = await TaskRepo.update(task);
  if (!updated) {
    throw new RouteError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to update task`
    );
  }
  return updated;
}

async function deleteAll(): Promise<void> {
  return TaskRepo.deleteAll();
}

export default {
  getAll,
  create,
  markDone,
  deleteAll,
} as const;
