import { useAppDispatch } from '@common/configStore';
import { push } from '@lagunovsky/redux-react-router';
import { PlayCircleOutline } from '@mui/icons-material';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, styled } from '@mui/material';
import { SessionGroup } from '@types';
import { formatStartDate, msToHuman } from 'formatters/formatDateDiff';
import React from 'react';
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
type Props = Merge<
  SessionGroup,
  {
    startSession: React.MouseEventHandler<HTMLElement>;
  }
>;

export const SimpleListItem = ({ name, total, lastRun, startSession }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = () => {
    dispatch(push(`/detail/${name}`));
  };
  return (
    <Root>
      <ListItem button onClick={navigate} data-name={name} className={classes.taskOverView}>
        <ListItemText
          primary={name}
          secondary={formatStartDate(lastRun)}
          //   className={classes.leftItem}
        />
        <ListItemText primary="Today" secondary={msToHuman(total)} className={classes.rightItem} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" id={name} onClick={startSession} size="large">
            <PlayCircleOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Root>
  );
};
