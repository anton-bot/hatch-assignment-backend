import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import cors from "cors";

import "express-async-errors";

import { taskRouter } from "./routes/api";

import EnvVars from "./constants/EnvVars";
import { StatusCodes } from "http-status-codes";

import { NodeEnvs } from "./constants/misc";
import { RouteError } from "./other/RouteError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", taskRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  let status = err instanceof RouteError ? err.status : StatusCodes.BAD_REQUEST;
  return res.status(status).json({ error: err.message });
});

export default app;
