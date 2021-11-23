/**
 * Updates a value in an array at the specified index
 * @template T
 * @param {number} idx
 * @param {T[]} arr
 * @param {T|((x:T) => T)} newVal
 */
export function updateAtIdx(idx, arr, newVal) {
  const oldVAl = arr[idx];
  return [
    ...arr.slice(0, idx),
    typeof newVal === 'function' ? newVal(oldVAl) : newVal,
    ...arr.slice(idx + 1),
  ];
}
