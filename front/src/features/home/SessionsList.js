import React from 'react';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const formatStart = 'yyy-MM-dd HH:mm';
const formatHour = 'HH:mm';

function renderRow(props) {
  const { index, style, data } = props;
  const { name, startDate, endDate, id } = data[index];
  const start = new Date(startDate);
  const end = new Date(endDate || Date.now());
  const duration = differenceInMinutes(end, start);
  return (
    <ListItem ContainerProps={{style}} key={id || index} ContainerComponent="div">
      <ListItemText primary={name} secondary={format(start, formatStart)} />
      <ListItemText primary={`${duration} min`} secondary={format(end, formatHour)}  />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
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

export default function SessionsList({ sessions }) {
  const classes = useStyles();
  const itemCount = sessions.length
  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={300} itemSize={46} itemCount={itemCount} itemData={sessions}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

SessionsList.propTypes = {
  sessions: PropTypes.array,
};
SessionsList.defaultProps = {
  sessions: []
};
