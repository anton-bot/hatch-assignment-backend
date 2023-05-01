import { Router } from "express";

import TaskRoutes from "./TaskRoutes";

const apiRouter = Router();
const taskRouter = Router();

taskRouter.get(`/task`, TaskRoutes.getAll);
taskRouter.post(`/task`, TaskRoutes.create);
taskRouter.put(`/task/:id`, TaskRoutes.update);
taskRouter.delete(`/task/:id`, TaskRoutes.remove);

apiRouter.use(`/api`, taskRouter);

export default apiRouter;
