import { Task } from "../../models/Task";
import { generateTasks } from "../utils/generateTasks";

export const tasks: Task[] = generateTasks({ active: 20, done: 50 });
