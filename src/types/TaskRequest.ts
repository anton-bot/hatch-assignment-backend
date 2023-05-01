export type TaskRequest = {
  label: string;
};

export const isValidTaskRequest = (obj: unknown): obj is TaskRequest => {
  return (
    !!obj &&
    typeof obj === "object" &&
    "label" in obj &&
    typeof obj.label === "string" &&
    obj.label.trim() !== ""
  );
};
