import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { formatDateDiff, formatStartDate, msToHuman } from 'formatters/formatDateDiff';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles(theme => ({
  nested: {
    backgroundColor: theme.palette.background.paper,
  },
  taskOverView: {
    display: 'flex',
  },
  rightItem: {
    flex: '0 1 25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  childWrapper: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.grey[100],
  },
  leftItem: {
    flex: '1 1 auto',
  },
}));
/**
 * @typedef {import('@types').SessionGroup} SessionGroup
 * @typedef {import('@types').Session} Session
 **/

/** @typedef {Object} props
 * @property {React.MouseEventHandler<HTMLElement>} startSession
 * @property {React.MouseEventHandler<HTMLDivElement>} editSession
 * @property {string} activeRow
 * @property {React.MouseEventHandler<HTMLDivElement>} activateRow
 * @property {*} style
 */
/** @typedef {import('type-fest').Merge<SessionGroup, props>} Props */

/**
 * Renders a group of sesions. A group of sessions is a list of sessions
 * that have the same name
 * @param {Props} props
 */
export function TaskGroup({
  name,
  activateRow,
  activeRow,
  total,
  lastRun,
  sessions,
  startSession,
  editSession,
  style,
}) {
  const css = useStyles();
  const isOpen = activeRow === name;
  return (
    <div style={style}>
      <ListItem button onClick={activateRow} data-name={name} className={css.taskOverView}>
        <ListItemText
          primary={name}
          secondary={formatStartDate(lastRun)}
          classes={{ root: css.leftItem }}
        />
        <ListItemText primary="Today" secondary={msToHuman(total)} className={css.rightItem} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" id={name} onClick={startSession}>
            <PlayCircleOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className={css.childWrapper} mountOnEnter>
        <List component="div" disablePadding>
          {sessions.map(({ id, startDate: start, endDate: end = Date.now() }) => (
            <ListItem key={id} id={id} onClick={editSession} button className={css.nested}>
              <ListItemText primary="Started" secondary={formatStartDate(start)} />
              <ListItemText primary="Duration" secondary={formatDateDiff(start, end)} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
