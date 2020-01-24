import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import format from 'date-fns/format'
import differenceInMinutes from 'date-fns/differenceInMinutes';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx'
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

const formatStart = 'yyy-MM-dd HH:mm';
const formatHour = 'HH:mm';

const renderRow = onDelete => props => {
  const { index, style, data } = props;
  const { name, startDate, endDate, id } = data[index];
  const start = new Date(startDate);
  const end = new Date(endDate || Date.now());
  const duration = differenceInMinutes(end, start);
  const deleteAction = useCallback(() => onDelete(id), [onDelete, id])

  return (
    <ListItem ContainerProps={{ style }} key={id || index} ContainerComponent="div">
      <ListItemText primary={name} className='sl-left-item' secondary={format(start, formatStart)} />
      <ListItemText primary={`${duration} min`} secondary={format(end, formatHour)} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={deleteAction}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const doTimes = times => fn => {
  const res = [];
  for (; times; times--) res.push(fn(times))
  return res;
}

const Loading = ({smallScreen}) => {
  return (
  <div className='home-sessions-skeleton'>
    {doTimes(smallScreen ? 5 : 8)(i => <Skeleton height={46} key={i} />)}
  </div>
) }

export default function SessionsList({ sessions, onDelete }) {
  const smallScreen = useMediaQuery('(max-width: 600px');
  const classes = useStyles();
  const itemCount = sessions.length
  return (
    <div className={clsx(classes.root, 'home-sessions-list')}>
      {
        itemCount ?
          <FixedSizeList className={'home-sessions-list'} height={smallScreen ? 200 : 400} width='100%' itemSize={46} itemCount={itemCount} itemData={sessions}>
            {renderRow(onDelete)}
          </FixedSizeList>
          : <Loading smallScreen={smallScreen}/>
      }
    </div>
  );
}

SessionsList.propTypes = {
  sessions: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
};
SessionsList.defaultProps = {
  sessions: []
};
