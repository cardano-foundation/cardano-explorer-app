export function isNotNull<T>(b: T | null): b is T {
  return b != null;
}
