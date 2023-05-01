import jsonfile from "jsonfile";

import { Task } from "../models/Task";
import path from "path";
import fs from "fs";

const DB_FILE_NAME = "database.json";

interface Database {
  tasks: Task[];
}

const DATABASE_FILENAME = path.join(__dirname, DB_FILE_NAME);
const DEFAULT_DB: Database = {
  tasks: [],
};

function openDb(): Promise<Database> {
  if (!fs.existsSync(DATABASE_FILENAME)) {
    jsonfile.writeFileSync(DATABASE_FILENAME, DEFAULT_DB);
  }

  return jsonfile.readFile(path.join(__dirname, DB_FILE_NAME));
}

function saveDb(db: Database): Promise<void> {
  return jsonfile.writeFile(path.join(__dirname, DB_FILE_NAME), db);
}

export default {
  openDb,
  saveDb,
} as const;
