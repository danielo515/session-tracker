import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { differenceInMinutes } from 'date-fns';
import React from 'react';
import { RenderTimer } from '../home/Timer';
import { Started } from './StartedLabel';

const PREFIX = 'CircularTimer';

export const classes = {
  shell: `${PREFIX}-shell`,
  wrapper: `${PREFIX}-wrapper`,
  timer: `${PREFIX}-timer`,
  circle: `${PREFIX}-circle`,
  bottom: `${PREFIX}-bottom`,
};

const Root = styled('div')(({ color, theme }) => ({
  padding: theme.spacing(4),

  [`& .${classes.wrapper}`]: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.timer}`]: {
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

  [`& .${classes.circle}`]: {
    color: color || theme.palette.primary.main,
  },

  [`& .${classes.bottom}`]: {
    position: 'absolute',
    top: 0,
    color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
  },
}));

type Props = {
  name: string;
  color: string;
  expectedDuration: number;
  startDate: Date;
};

export function CircularTimer({ name, startDate, color, expectedDuration }: Props) {
  const percentCompleted = differenceInMinutes(new Date(), startDate) / expectedDuration;
  return (
    <Root color={color}>
      <div className={classes.wrapper}>
        <CircularProgress size={250} className={classes.bottom} variant="determinate" value={100} />
        <CircularProgress
          size={250}
          variant="determinate"
          value={percentCompleted * 100}
          classes={{ circle: classes.circle }}
        />
        <div className={classes.timer}>
          <RenderTimer startDate={startDate.toISOString()} />
          <Typography>{name}</Typography>
          <Started startDate={startDate} />
        </div>
      </div>
    </Root>
  );
}
