import { byLabelAsc } from "../utils/byLabel";
import { byTimestampDesc } from "../utils/byTimestamp";
import { GroupedTasks } from "../types/GroupedTasks";

const MAX_COMPLETED_TASKS = 10;

export const sortAndTruncateTasks = (tasks: GroupedTasks) => {
  const sortedTasks = {
    active: [...tasks.active].sort(byLabelAsc),
    done: [...tasks.done].sort(byTimestampDesc),
  };

  sortedTasks.done.length = Math.min(
    sortedTasks.done.length,
    MAX_COMPLETED_TASKS
  );
  sortedTasks.done.sort(byLabelAsc);

  return sortedTasks;
};
