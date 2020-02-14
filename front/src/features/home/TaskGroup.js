import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
          {nested.map(({ id }) => (
            <ListItem key={id} button className={css.nested}>
              <ListItemText primary="Started" secondary="10 May 2018" />
              <ListItemText primary="Duration" secondary="5 hours" />
            </ListItem>))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
