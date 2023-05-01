import { StatusCodes } from "http-status-codes";

export class RouteError extends Error {
  status: StatusCodes;
  constructor(status: StatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
