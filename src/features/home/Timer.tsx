import { styled } from '@mui/material';
import { motion } from 'framer-motion';

import React from 'react';
import useTimeDiff from './hooks/useTimeDiff';
import { msToHourMinSec } from './msToHourMinSec';

const TimerRoot = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  display: 'flex',
  fontSize: '1.5rem',
}));

export const RenderTimer = ({ startDate }: { startDate: string | Date }) => {
  useTimeDiff(startDate);
  const [hours, minutes, seconds] = msToHourMinSec(Date.now() - new Date(startDate).getTime());
  return (
    <TimerRoot>
      <div> {hours} </div>:<div> {minutes} </div>
      <div> : </div>
      <motion.div> {seconds} </motion.div>
    </TimerRoot>
  );
};

type PropsB = {
  isActive: boolean;
  startDate?: string | Date;
};
export default function Timer({ startDate }: PropsB) {
  return <div>{startDate && <RenderTimer startDate={startDate} />}</div>;
}

Timer.defaultProps = {
  isActive: true,
};
