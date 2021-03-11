import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatDateDiff, formatStartDate, msToHuman } from 'formatters/formatDateDiff';

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
 * @property {() => any} secondaryAction
 * @property {(id:string) => any} primaryAction
 * @property {*} Icon
 */
/** @typedef {import('type-fest').Merge<SessionGroup, props>} Props */

/**
 * Renders a group of sesions. A group of sessions is a list of sessions
 * that have the same name
 * @param {Props} props
 */
export function TaskGroup({ name, total, lastRun, sessions, secondaryAction }) {
  const css = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);
  return (
    <React.Fragment>
      <ListItem button onClick={toggle} className={css.taskOverView}>
        <ListItemText
          primary={name}
          secondary={formatStartDate(lastRun)}
          classes={{ root: css.leftItem }}
        />
        <ListItemText primary="Today" secondary={msToHuman(total)} className={css.rightItem} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={css.childWrapper}>
        <List component="div" disablePadding>
          {sessions.map(({ id, startDate: start, endDate: end = Date.now() }) => (
            <ListItem key={id} button className={css.nested}>
              <ListItemText primary="Started" secondary={formatStartDate(start)} />
              <ListItemText primary="Duration" secondary={formatDateDiff(start, end)} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
