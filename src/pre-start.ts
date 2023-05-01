import path from "path";
import dotenv from "dotenv";
import { parse } from "ts-command-line-args";

interface Args {
  env: string;
}

const args = parse<Args>({
  env: {
    type: String,
    defaultValue: "development",
    alias: "e",
  },
});

// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}
