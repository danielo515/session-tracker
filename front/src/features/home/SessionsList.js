import React, {useCallback} from 'react';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
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
  const deleteAction = useCallback(() => onDelete(id), [onDelete,id])

  return (
    <ListItem ContainerProps={{style}} key={id || index} ContainerComponent="div">
      <ListItemText primary={name} secondary={format(start, formatStart)} />
      <ListItemText primary={`${duration} min`} secondary={format(end, formatHour)}  />
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

export default function SessionsList({ sessions, onDelete }) {
  const classes = useStyles();
  const itemCount = sessions.length
  return (
    <div className={clsx(classes.root,'home-sessions-list')}>
      <FixedSizeList className={'home-sessions-list'} height={400} width={300} itemSize={46} itemCount={itemCount} itemData={sessions}>
        {renderRow(onDelete)}
      </FixedSizeList>
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
