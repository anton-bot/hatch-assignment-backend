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

async function update(task: Task): Promise<void> {
  const exists = await TaskRepo.exists(task.id);
  if (!exists) {
    throw new RouteError(StatusCodes.NOT_FOUND, `Task not found`);
  }

  return TaskRepo.update(task);
}

async function deleteAll(): Promise<void> {
  return TaskRepo.deleteAll();
}

export default {
  getAll,
  create,
  update,
  deleteAll,
} as const;
