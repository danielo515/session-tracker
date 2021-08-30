import { Box, CircularProgress, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { differenceInMinutes } from 'date-fns';
import format from 'date-fns/format';
import React from 'react';
import { RenderTimer } from '../home/Timer';

const useStyles = makeStyles(theme => ({
  shell: {
    padding: theme.spacing(4),
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontFamily: "'Roboto',Monospace",
    top: '50%',
    transform: 'translateY(-33%)',
  },
  circle: {
    color: ({ color = theme.palette.primary.main }) => color,
  },
  bottom: {
    position: 'absolute',
    top: 0,
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  // Editable date
  startDate: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '1rem',
  },
  iconButton: {
    position: 'absolute',
    right: -theme.spacing(3),
    top: -2,
  },
}));

/**
 * Renders a date with a edit icon
 * @param {Object} props
 * @param {Date} props.startDate
 */
function Started({ startDate }) {
  const css = useStyles();
  const formattedDate = format(startDate, 'E. HH:mm');

  return (
    <div className={css.startDate}>
      <Typography variant="subtitle2">{formattedDate}</Typography>
      <IconButton className={css.iconButton} size="small">
        <EditIcon className={css.icon} />
      </IconButton>
    </div>
  );
}
/**
 * @typedef {Object} Props
 * @property {string} name
 * @property {string} color
 * @property {number} expectedDuration
 * @property {Date} startDate
 */

/** @param {Props} props **/
export function CircularTimer({ name, startDate, color, expectedDuration }) {
  const css = useStyles({ color });
  const percentCompleted = differenceInMinutes(new Date(), startDate) / expectedDuration;
  return (
    <div className={css.shell}>
      {' '}
      <div className={css.wrapper}>
        <CircularProgress size={250} className={css.bottom} variant="determinate" value={100} />
        <CircularProgress
          size={250}
          variant="determinate"
          value={percentCompleted * 100}
          classes={{ circle: css.circle, svg: css.svg }}
        />
        <div className={css.timer}>
          <RenderTimer startDate={startDate.toISOString()} />
          <Typography>{name}</Typography>
          <Started startDate={startDate} />
        </div>
      </div>
    </div>
  );
}
