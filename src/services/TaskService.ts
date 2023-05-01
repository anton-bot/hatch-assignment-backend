import TaskRepo from "@src/repos/TaskRepo";
import { Task } from "@src/models/Task";
import { RouteError } from "@src/other/RouteError";
import { StatusCodes } from "http-status-codes";

function getAll(): Promise<Task[]> {
  return TaskRepo.getAll();
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
