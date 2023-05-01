import { Task } from "../models/Task";
import orm from "./MockOrm";

async function getOne(taskId: string): Promise<Task | null> {
  const db = await orm.openDb();
  for (const task of db.tasks) {
    if (task.id === taskId) {
      return task;
    }
  }
  return null;
}

async function getAll(): Promise<Task[]> {
  const db = await orm.openDb();
  return db.tasks;
}

async function create(task: Task): Promise<Task> {
  const db = await orm.openDb();
  db.tasks.push(task);
  await orm.saveDb(db);
  return task;
}

async function update(updatedTask: Task): Promise<Task | null> {
  const db = await orm.openDb();
  for (const existingTask of db.tasks) {
    if (existingTask.id === updatedTask.id) {
      existingTask.label = updatedTask.label;
      existingTask.done = updatedTask.done;
      await orm.saveDb(db);
      return existingTask;
    }
  }
  return null;
}

async function deleteAll(): Promise<void> {
  const db = await orm.openDb();
  db.tasks = [];
  return orm.saveDb(db);
}

export default {
  getOne,
  getAll,
  create,
  update,
  deleteAll,
} as const;
