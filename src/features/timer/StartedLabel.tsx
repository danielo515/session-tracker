import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import format from 'date-fns/format';
import React from 'react';
import { classes } from './CircularTimer';

const StartedRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'center',

  [`& .${classes.icon}`]: {
    fontSize: '1rem',
  },

  [`& .${classes.iconButton}`]: {
    position: 'absolute',
    top: '-4px',
    right: '-30px',
  },
});
/**
 * Renders a date with a edit icon
 */
export function Started({ startDate }: { startDate: Date }) {
  const formattedDate = format(startDate, 'E. HH:mm');

  return (
    <StartedRoot>
      <Typography variant="subtitle2">{formattedDate}</Typography>
      <IconButton className={classes.iconButton} size="small">
        <EditIcon className={classes.icon} />
      </IconButton>
    </StartedRoot>
  );
}
