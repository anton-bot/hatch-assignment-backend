import { v4 as uuid } from "uuid";

export type Task = {
  id: string;
  label: string;
  timestamp: number;
  done: boolean;
};

function create(
  label: string,
  id?: string,
  timestamp?: number,
  done?: boolean
): Task {
  return {
    id: id ?? uuid(),
    label,
    timestamp: timestamp ?? Date.now(),
    done: done ?? false,
  };
}

function from(data: object): Task {
  if (!isValidTask(data)) {
    throw new Error("Invalid data while trying to construct a task");
  }

  return create(data.label, data.id, data.timestamp, data.done);
}

function isValidTask(obj: unknown): obj is Task {
  return (
    !!obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "label" in obj &&
    "timestamp" in obj &&
    "done" in obj
  );
}

export default {
  create,
  from,
  isValidTask,
} as const;
