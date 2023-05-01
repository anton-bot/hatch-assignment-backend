import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";

import "express-async-errors";

import BaseRouter from "@src/routes/api";

import EnvVars from "@src/constants/EnvVars";
import HttpStatusCodes from "http-status-codes";

import { NodeEnvs } from "@src/constants/misc";
import { RouteError } from "@src/other/RouteError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

app.use("/", BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response) => {
  logger.err(err, true);
  let status =
    err instanceof RouteError ? err.status : HttpStatusCodes.BAD_REQUEST;
  return res.status(status).json({ error: err.message });
});

export default app;
