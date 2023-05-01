import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import { isValidTaskRequest } from "../types/TaskRequest";

async function getAll(req: Request, res: Response) {
  const filter =
    typeof req.query.filter === "string" && req.query.filter.trim()
      ? req.query.filter.trim()
      : undefined;
  const tasks = await TaskService.getAll(filter);
  return res.status(StatusCodes.OK).json({ data: tasks });
}

async function create(req: Request, res: Response) {
  const { task } = req.body;
  if (!isValidTaskRequest(task)) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  const createdTask = await TaskService.create(task);
  return res.status(StatusCodes.CREATED).send({
    data: createdTask,
  });
}

async function update(req: Request, res: Response) {
  const { task } = req.body;
  const updatedTask = await TaskService.update(task);
  return res.status(StatusCodes.OK).send({
    data: updatedTask,
  });
}

async function deleteAll(req: Request, res: Response) {
  await TaskService.deleteAll();
  return res.status(StatusCodes.OK).end();
}

export default {
  getAll,
  create,
  update,
  deleteAll,
} as const;
