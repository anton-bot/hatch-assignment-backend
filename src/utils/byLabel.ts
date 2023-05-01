type ObjectWithLabel = {
  label: string;
};

export const byLabelAsc = (a: ObjectWithLabel, b: ObjectWithLabel) =>
  a.label.localeCompare(b.label);
