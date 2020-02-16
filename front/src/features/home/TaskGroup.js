import Collapse from "@material-ui/core/Collapse";
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from 'date-fns/format';
import React, { useCallback } from "react";
import { FixedSizeList } from 'react-window';

const formatStart = 'yyy-MM-dd';
const formatHour = 'HH:mm'

const renderRow = (onDelete) => props => {
  const { index, style, data } = props;
  const { name, startDate, endDate, id } = data[index];
  const start = new Date(startDate);
  const end = new Date(endDate || Date.now());
  const duration = differenceInMinutes(end, start);
  const deleteAction = useCallback(() => onDelete(id), [onDelete, id])

  return (
    <ListItem ContainerProps={{ style }} ContainerComponent="div" >
      <ListItemText primary={format(start, formatStart)} className='sl-left-item' secondary={format(start, formatHour)} />
      <ListItemText primary={`${duration} min`} secondary={format(end, formatHour)} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={deleteAction}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}


const useStyles = makeStyles(theme => ({
  nested: {
    backgroundColor: theme.palette.background.paper
  },
  taskOverView: {
    display: "flex"
  },
  rightItem: {
    flex: "0 1 25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  childWrapper: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.grey[100],
  },
  leftItem: {
    flex: "1 1 auto"
  }
}));

export function TaskGroup({ name, total, lastRun, nested }) {
  const css = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);
  const row = renderRow(i => i);
  const itemSize = 72;
  const maxItemsToSow = 6;
  const height = Math.min( nested.length , maxItemsToSow ) * itemSize;
  return (
    <React.Fragment>
      <ListItem button onClick={toggle} className={css.taskOverView}>
        <ListItemText
          primary={name}
          secondary={lastRun}
          classes={{ root: css.leftItem, dense: "rabo" }}
        />
        <ListItemText primary="Today" secondary={total} className={css.rightItem} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={css.childWrapper}>
        <List component="div" disablePadding>
          <FixedSizeList className={'home-sessions-list'} height={height} width="100%" itemSize={itemSize} itemCount={nested.length} itemData={nested}>
            {row}
          </FixedSizeList>

        </List>
      </Collapse>
    </React.Fragment>
  );
}
