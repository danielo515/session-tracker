import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { FixedSizeList } from 'react-window';
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
const ItemHeight = 72;
const ListHeight = 3 * ItemHeight;
/**
 * @typedef {import('@types').SessionGroup} SessionGroup
 * @typedef {import('@types').Session} Session
 **/

/** @typedef {Object} props
 * @property {React.MouseEventHandler<HTMLElement>} startSession
 * @property {React.MouseEventHandler<HTMLDivElement>} editSession
 * @property {string} activeRow
 * @property {(name:string) => any} activateRow
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
}) {
  const css = useStyles();
  const [isOpen, setIsOpen] = useState(activeRow === name);
  /* This is tricky. 
     When it is closed and the function is called it will call the outer function
     to activate this row.
     When it is open and the function is called, it will mutate the internal state first
     so the exit animation can happen and when the animation finishes it will call this
     function again which will sync the internal state with the outher one
   */
  const toggleRow = () => {
    if (isOpen) {
      return setIsOpen(false);
    }
    activateRow(name);
  };
  return (
    <>
      <ListItem button onClick={toggleRow} data-name={name} className={css.taskOverView}>
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
      <Collapse
        in={isOpen}
        timeout="auto"
        unmountOnExit
        className={css.childWrapper}
        onExited={toggleRow}
        mountOnEnter
        appear
      >
        <List component="div" disablePadding>
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
                <ListItem style={style} id={id} onClick={editSession} button className={css.nested}>
                  <ListItemText primary="Started" secondary={formatStartDate(start)} />
                  <ListItemText primary="Duration" secondary={formatDateDiff(start, end)} />
                </ListItem>
              );
            }}
          </FixedSizeList>
        </List>
      </Collapse>
    </>
  );
}
