import useAppSelector from 'hooks/useSelector';
import { selectSessionsByName } from './redux/selectSessionsByName';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DetailListItem } from './components/ListItem';
import React, { useState } from 'react';
import { List } from '@mui/material';
import { selectSessionById } from './redux/selectSessionById';
import { calculateSessionDuration } from '@common/calculateSessionDuration';
import { msToHuman } from 'formatters/formatDateDiff';
import { format } from 'date-fns/esm';
import { useAppDispatch } from '@common/configStore';
import { deleteSession } from 'features/home/redux/deleteSession';
import { motion } from 'framer-motion';

type Props = {
  sessionName: string;
};

const formatEndDate = (endDate: string) => {
  return format(new Date(endDate), 'HH:mm:ss');
};

const formatStartDate = (startDate: string) => {
  return format(new Date(startDate), 'dd/MM/yyyy HH:mm:ss');
};

const Item = ({ id }: { id: string }) => {
  const session = useAppSelector((state) => selectSessionById(state, id));
  const dispatch = useAppDispatch();
  const [deleted, setDeleted] = useState(false);
  const deleteLocal = () => {
    setDeleted(true);
  };
  const deleteMe = (variant: string) => {
    if (variant === 'exit') {
      dispatch(deleteSession(id));
    }
  };

  if (!session) {
    throw new Error('Session not found inside a list of sessions, WTF?');
  }

  const duration = calculateSessionDuration(session);
  const range = `${formatStartDate(session.startDate)} - ${formatEndDate(session.endDate)}`;

  return (
    <DetailListItem
      title={msToHuman(duration)}
      subTitle={range}
      onClick={deleteLocal}
      //@ts-expect-error mui types are incorrect
      component={motion.li}
      variants={{
        exit: {
          opacity: 0,
          x: -400,
          backgroundColor: 'rgba(255, 109, 109, 0.445)',
          transition: { duration: 0.3 },
        },
        present: { opacity: 1 },
      }}
      onAnimationComplete={deleteMe}
      animate={deleted ? 'exit' : 'present'}
    />
  );
};

export function SingleSessionList({ sessionName }: Props) {
  const sessions = useAppSelector((state) => selectSessionsByName(state, sessionName));
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          sx={{
            overflow: 'scroll',
            height,
            width,
            paddingTop: 0,
            '& li:first-of-type': {
              margin: 0,
            },
          }}
        >
          {sessions.slice(0, 25).map((session) => (
            <Item key={session.id} id={session.id} />
          ))}
        </List>
      )}
    </AutoSizer>
  );
}
