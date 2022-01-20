import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import { FixedSizeList } from 'react-window';
import { formatDateDiff, formatStartDate, msToHuman } from 'formatters/formatDateDiff';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import { useSelectRow } from './redux/selectRow';
import { SessionGroup } from '@types';
import { Merge } from 'type-fest';

const PREFIX = 'TaskGroup';

const classes = {
  nested: `${PREFIX}-nested`,
  taskOverView: `${PREFIX}-taskOverView`,
  rightItem: `${PREFIX}-rightItem`,
  childWrapper: `${PREFIX}-childWrapper`,
  leftItem: `${PREFIX}-leftItem`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.nested}`]: {
    backgroundColor: theme.palette.background.paper,
  },

  [`& .${classes.taskOverView}`]: {
    display: 'flex',
  },

  [`& .${classes.rightItem}`]: {
    flex: '0 1 25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  [`& .${classes.childWrapper}`]: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.grey[100],
  },

  [`& .${classes.leftItem}`]: {
    flex: '1 1 auto',
  },
}));

const ItemHeight = 72;
const ListHeight = 3 * ItemHeight;

type Props = Merge<
  SessionGroup,
  {
    startSession: React.MouseEventHandler<HTMLElement>;
    editSession: React.MouseEventHandler<HTMLDivElement>;
    onToggle: (sessionName: string) => any;
  }
>;

/**
 * Renders a group of sesions. A group of sessions is a list of sessions
 * that have the same name
 */
export function TaskGroup({
  name,
  total,
  lastRun,
  sessions,
  onToggle,
  startSession,
  editSession,
}: Props) {
  const { selectRow, selectedRow } = useSelectRow();
  const isOpen = name === selectedRow;
  const toggleRow = () => {
    if (isOpen) {
      selectRow('');
      onToggle('');
    } else {
      selectRow(name);
      onToggle(name);
    }
  };
  // We need to inform if the session is selected on mount (just once for perf reasons)
  // This is needed to keep the parent state on situations like page change, because the parent state is local
  useEffect(() => {
    if (isOpen) {
      onToggle(name);
    }
  }, []);
  return (
    <Root>
      <ListItem button onClick={toggleRow} data-name={name} className={classes.taskOverView}>
        <ListItemText
          primary={name}
          secondary={formatStartDate(lastRun)}
          className={classes.leftItem}
        />
        <ListItemText primary="Today" secondary={msToHuman(total)} className={classes.rightItem} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" id={name} onClick={startSession} size="large">
            <PlayCircleOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {isOpen && (
        <List component="div" disablePadding className={classes.childWrapper}>
          <FixedSizeList
            height={Math.min(ListHeight, sessions.length * ItemHeight)}
            width="100%"
            itemSize={ItemHeight}
            itemCount={sessions.length}
            itemData={sessions}
          >
            {({ index, style, data }) => {
              const { id, startDate: start, endDate: end = Date.now() } = data[index];
              return (
                <ListItem
                  style={style}
                  id={id}
                  onClick={editSession}
                  button
                  className={classes.nested}
                >
                  <ListItemText primary="Started" secondary={formatStartDate(start)} />
                  <ListItemText primary="Duration" secondary={formatDateDiff(start, end)} />
                </ListItem>
              );
            }}
          </FixedSizeList>
        </List>
      )}
    </Root>
  );
}
