const toNumber = (value: string, defaultVal = 0) => {
  const maybeValue = /\d+/.exec(value);
  if (!maybeValue) return defaultVal;
  return Number(maybeValue[0]);
};

const msToHours = (ms: number) => ms / 1000 / 60 / 60;

export const toFrappeCharts = (weekGroups: { [key: string]: number }) => {
  const tuples = Object.entries(weekGroups).sort(([a], [b]) => {
    const A = toNumber(a);
    const B = toNumber(b);
    if (A > B) return 1;
    return -1;
  });
  return tuples.reduce(
    ({ labels, values }, [key, value]) => {
      labels.push(key);
      values.push(msToHours(value));
      return { labels, values };
    },
    {
      labels: [] as string[],
      values: [] as number[],
    },
  );
};
