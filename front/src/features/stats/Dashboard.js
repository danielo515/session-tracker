import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import { createChartData } from './createChartData';
import minsToHoursMinutes from '../../common/minsToHoursMinutes';
import { FooterWithVersion } from '../common/index';
import DonutContainer from './Donut.container';
import { DaysNavigator } from './NavigationControls';
import WeekChart from './WeekChart';
const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },

  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflow: 'hidden',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 440,
    [theme.breakpoints.down('xs')]: { height: 400 },
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

/** @typedef {import('@types').SessionWithDuration} SessionWithDuration */
/**
 * @param {{ sessions: import('@types').Session[]  }} args
 * @return {*}
 */
export default function Dashboard({ sessions = [] }) {
  // @ts-ignore
  const classes = useStyles();
  const monthsAgo = 0;

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { monthData } = createChartData({
    sessions,
    weeksAgo: 0,
    monthsAgo,
  });

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Day */}
            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                <DonutContainer title={<DaysNavigator />} />
              </Paper>
            </Grid>
            {/* Week */}
            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                <WeekChart />
              </Paper>
            </Grid>
            {/* Month */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart
                  formatter={minsToHoursMinutes}
                  title="Month"
                  names={monthData.names}
                  sessions={monthData.data}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <FooterWithVersion />
          </Box>
        </Container>
      </main>
    </div>
  );
}
