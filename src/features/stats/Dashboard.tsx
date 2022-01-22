import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FooterWithVersion } from '../common/index';
import DonutContainer from './Donut.container';
import { DaysNavigator } from './NavigationControls';
import WeekChart from './WeekChart';
import MonthChart from './MonthChart';
import { Link, Outlet } from 'react-router-dom';
const PREFIX = 'Dashboard';

const classes = {
  root: `${PREFIX}-root`,
  toolbar: `${PREFIX}-toolbar`,
  toolbarIcon: `${PREFIX}-toolbarIcon`,
  appBarShift: `${PREFIX}-appBarShift`,
  menuButton: `${PREFIX}-menuButton`,
  menuButtonHidden: `${PREFIX}-menuButtonHidden`,
  title: `${PREFIX}-title`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
  paper: `${PREFIX}-paper`,
  fixedHeight: `${PREFIX}-fixedHeight`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    height: '90%',
  },

  [`& .${classes.toolbar}`]: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  [`& .${classes.toolbarIcon}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  [`& .${classes.appBarShift}`]: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.menuButton}`]: {
    marginRight: 36,
  },

  [`& .${classes.menuButtonHidden}`]: {
    display: 'none',
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    overflow: 'auto',
  },

  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100%',
  },

  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export const Days = () => <DonutContainer title={<DaysNavigator />} />;

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Root className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <Link to="week">Week</Link>
            <Outlet />
          </Paper>
          <Box pt={4}>
            <FooterWithVersion />
          </Box>
        </Container>
      </main>
    </Root>
  );
}
