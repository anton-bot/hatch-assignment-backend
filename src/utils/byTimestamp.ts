type ObjectWithTimestamp = {
  timestamp: number;
};

export const byTimestampDesc = (
  a: ObjectWithTimestamp,
  b: ObjectWithTimestamp
) => b.timestamp - a.timestamp;
