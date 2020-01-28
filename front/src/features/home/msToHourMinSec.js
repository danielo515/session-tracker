export const second = 1000;
export const minute = 60 * second;
export const hour = minute * 60;

export const msToHourMinSec = ms => {
  const hours = ms / hour | 0;
  const minutes = (ms % hour) / minute | 0; // 32 bit integer shorthand
  const seconds = (ms % minute) / second | 0;
  return [
    `${hours}`.padStart(2, '0'),
    `${minutes}`.padStart(2, '0'),
    `${seconds}`.padStart(2, '0')
  ];
};
