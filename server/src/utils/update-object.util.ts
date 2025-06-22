import { isEqual } from 'lodash';

export const getUpdatedFields = <T extends Record<string, any>>(
  original: T,
  given: Partial<T>
): { updates: Partial<T>; change: Boolean } => {
  const updates: Partial<T> = {};

  for (const key in given) {
    if (
      Object.prototype.hasOwnProperty.call(given, key) &&
      !isEqual(original[key], given[key])
    ) {
      updates[key] = given[key];
    }
  }

  if (Object.keys(updates).length > 0) {
    return { updates, change: true };
  }

  return { updates, change: false };
};

