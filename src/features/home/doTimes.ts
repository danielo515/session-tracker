type cb<T> = (i: number) => T;

export const doTimes = (times: number) => <T>(fn: cb<T>) => {
  const res = [] as T[];
  for (; times; times--) res.push(fn(times));
  return res;
};
