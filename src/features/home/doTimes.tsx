type cb<T> = <T>(i: number) => T;
type DoTimes<T> = (n: number, cb: cb<T>) => T[];

export const doTimes = (times: number) => <T,>(fn: cb<T>) => {
  const res = [];
  for (; times; times--) res.push(fn(times));
  return res;
};
