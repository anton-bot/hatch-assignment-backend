import jsonfile from "jsonfile";

import { Task } from "../models/Task";
import path from "path";

const DB_FILE_NAME = "database.json";

interface Database {
  tasks: Task[];
}

function openDb(): Promise<Database> {
  return jsonfile.readFile(path.join(__dirname, DB_FILE_NAME));
}

function saveDb(db: Database): Promise<void> {
  return jsonfile.writeFile(path.join(__dirname, DB_FILE_NAME), db);
}

export default {
  openDb,
  saveDb,
} as const;
