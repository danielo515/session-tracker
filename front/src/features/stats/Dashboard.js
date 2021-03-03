import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import { createChartData } from './createChartData';
import IconButton from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import minsToHoursMinutes from '../../common/minsToHoursMinutes';
import { FooterWithVersion } from '../common/index';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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

function NavigationControls({ setValue, baseName, value, text, unit }) {
  const { navigation } = useStyles();
  const back = () => setValue(value + 1);
  const next = () => setValue(value - 1);
  return (
    <div className={navigation}>
      <IconButton onClick={back}>
        <NavigateBeforeIcon />
      </IconButton>
      <Typography variant="button" align="center">
        {' '}
        {text || (value === 0 ? baseName : `${value} ${unit} ago`)}
      </Typography>
      <IconButton onClick={next} disabled={value === 0}>
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}

/**
 * @param {number} ago
 */
const formatDaysAgo = ago => (ago > 0 ? format(subDays(new Date(), ago), 'E d MMM') : 'Today');

/**
 * @param {{ sessions: import('../../types').Session[]}} args
 * @return {*}
 */
export default function Dashboard({ sessions = [] }) {
  const classes = useStyles();
  const [daysAgo, setDay] = React.useState(0);
  const [weeksAgo, setWeek] = React.useState(0);
  const [monthsAgo /*, setMonth*/] = React.useState(0);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { dayData, weekData, monthData } = createChartData({
    sessions,
    daysAgo,
    weeksAgo,
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
                <Chart
                  sessions={dayData.data}
                  names={dayData.names}
                  title={
                    <NavigationControls
                      value={daysAgo}
                      setValue={setDay}
                      text={formatDaysAgo(daysAgo)}
                    />
                  }
                />
              </Paper>
            </Grid>
            {/* Week */}
            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                <Chart
                  formatter={minsToHoursMinutes}
                  sessions={weekData.data}
                  names={weekData.names}
                  title={
                    <NavigationControls
                      value={weeksAgo}
                      setValue={setWeek}
                      baseName="this week"
                      unit="weeks"
                    />
                  }
                />
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
