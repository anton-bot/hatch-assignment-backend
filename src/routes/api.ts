import { Router } from "express";
import TaskRoutes from "./TaskRoutes";

const taskRouter = Router();

taskRouter.get(`/task`, TaskRoutes.getAll);
taskRouter.post(`/task`, TaskRoutes.create);
taskRouter.put(`/task/:id`, TaskRoutes.markDone);
taskRouter.delete(`/task/:id`, TaskRoutes.deleteAll);

export { taskRouter };
