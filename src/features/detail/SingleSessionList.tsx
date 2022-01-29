import useAppSelector from 'hooks/useSelector';
import { selectSessionsByName } from './redux/selectSessionsByName';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DetailListItem } from './components/ListItem';
import React from 'react';
import { List } from '@mui/material';
import { selectSessionById } from './redux/selectSessionById';
import { calculateSessionDuration } from '@common/calculateSessionDuration';
import { msToHuman } from 'formatters/formatDateDiff';
import { format } from 'date-fns/esm';

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
  if (!session) {
    throw new Error('Session not found inside a list of sessions, WTF?');
  }

  const duration = calculateSessionDuration(session);
  const range = `${formatStartDate(session.startDate)} - ${formatEndDate(session.endDate)}`;

  return <DetailListItem key={session.id} title={msToHuman(duration)} subTitle={range} />;
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
          {sessions.map((session) => (
            <Item key={session.id} id={session.id} />
          ))}
        </List>
      )}
    </AutoSizer>
  );
}
