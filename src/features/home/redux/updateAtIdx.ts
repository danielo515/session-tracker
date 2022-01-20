/**
 * Updates a value in an array at the specified index
 */
export function updateAtIdx<T>(idx: number, arr: T[], newVal: T | ((x: T) => T)) {
  const oldVAl = arr[idx];
  return [
    ...arr.slice(0, idx),
    newVal instanceof Function ? newVal(oldVAl) : newVal,
    ...arr.slice(idx + 1),
  ];
}
