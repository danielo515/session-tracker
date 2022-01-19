import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';
import { setHours, setMinutes, format } from 'date-fns';
// https://codesandbox.io/s/ie3eh?file=/demo.js:0-900

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

/**
 *
 *
 * @param {Date} originalDate
 * @param {string} dateString
 * @return {Date}
 */
function parseDate(originalDate: Date, dateString: string) {
  const [hours, minutes] = dateString.split(':');
  return setHours(setMinutes(originalDate, parseInt(minutes, 10)), parseInt(hours, 10));
}

/**
 *
 * @param {{value: Date, onChange: (d: Date) => any, id: string, label?: string }} props
 */
export default function TimePickers({
  value,
  onChange,
  id,
  label,
}: {
  value: Date;
  onChange: (d: Date) => any;
  id: string;
  label?: string;
}) {
  const classes = useStyles();

  const formattedValue = format(value, 'HH:mm');

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        value={formattedValue}
        onChange={(e) => onChange(parseDate(value, e.target.value))}
        label={label}
        type="time"
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}
