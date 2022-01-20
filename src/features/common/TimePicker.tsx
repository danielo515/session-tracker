import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { setHours, setMinutes, format } from 'date-fns';

const Root = styled('form')({
  display: 'flex',
  flexWrap: 'wrap',
});

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
  const formattedValue = format(value, 'HH:mm');

  return (
    <Root noValidate>
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
    </Root>
  );
}
