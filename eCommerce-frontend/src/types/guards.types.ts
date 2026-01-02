// TypeScript Predicate
// don't return boolean => return value is string if the condtion is true
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};
