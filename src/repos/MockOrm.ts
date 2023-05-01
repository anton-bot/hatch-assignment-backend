import jsonfile from "jsonfile";

import { Task } from "@src/models/Task";

const DB_FILE_NAME = "database.json";

interface Database {
  tasks: Task[];
}

function openDb(): Promise<Database> {
  return jsonfile.readFile(__dirname + "/" + DB_FILE_NAME);
}

function saveDb(db: Database): Promise<void> {
  return jsonfile.writeFile(__dirname + "/" + DB_FILE_NAME, db);
}

export default {
  openDb,
  saveDb,
} as const;
