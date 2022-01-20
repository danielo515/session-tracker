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
    overflow: 'hidden',
  },

  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.fixedHeight}`]: {
    height: 440,
    [theme.breakpoints.down('sm')]: { height: 400 },
  },
}));

const drawerWidth = 240;

export default function Dashboard() {
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Root className={classes.root}>
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
                <MonthChart />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <FooterWithVersion />
          </Box>
        </Container>
      </main>
    </Root>
  );
}
