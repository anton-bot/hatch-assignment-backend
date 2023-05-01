import { Task, createTask } from "../../models/Task";
import { v4 as uuid } from "uuid";

type GenerateTaskArgs = {
  active: number;
  done: number;
};

export function generateTasks({ active, done }: GenerateTaskArgs): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < active; i++) {
    tasks.push(createTask(`Active task ${i}`, uuid(), randomDate(), false));
  }

  for (let i = 0; i < done; i++) {
    tasks.push(createTask(`Completed task ${i}`, uuid(), randomDate(), true));
  }

  return shuffleArray(tasks);
}

function randomDate() {
  const now = Date.now();
  const MAX_OFFSET = 1000 * 60 * 60 * 24 * 7; // 7 days
  const randomOffset = Math.floor(Math.random() * MAX_OFFSET);
  return now - randomOffset;
}

function shuffleArray(array: Task[]): Task[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
