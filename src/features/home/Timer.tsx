import { styled } from '@mui/material';
import { motion } from 'framer-motion';

import React from 'react';
import useTimeDiff from './hooks/useTimeDiff';
import { msToHourMinSec } from './msToHourMinSec';

const TimerRoot = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  display: 'flex',
  fontSize: '1.5rem',
  fontWeight: theme.typography.fontWeightLight,
}));

export const RenderTimer = ({ startDate }: { startDate: string | Date }) => {
  useTimeDiff(startDate);
  const [hours, minutes, seconds] = msToHourMinSec(Date.now() - new Date(startDate).getTime());
  return (
    <TimerRoot>
      <div> {hours} </div>:<div> {minutes} </div>
      <div> : </div>
      <motion.div
        key={seconds}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          duration: 0.5,
        }}
      >
        {seconds}
      </motion.div>
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
