import "./pre-start";
import logger from "jet-logger";

import EnvVars from "./constants/EnvVars";
import server from "./server";

const SERVER_START_MSG = "Express server started on port: " + EnvVars.port;

server.listen(EnvVars.port, () => logger.info(SERVER_START_MSG));
