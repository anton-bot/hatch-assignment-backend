import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import TaskService from "../services/TaskService";

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

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  await TaskService.remove(id);
  return res.status(StatusCodes.OK).end();
}

export default {
  getAll,
  create,
  update,
  remove,
} as const;
