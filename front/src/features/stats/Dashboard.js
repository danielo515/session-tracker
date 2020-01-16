import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import { Copyright } from '../common/Copyright';
import Navigation from '../common/Navigation'
import { createChartData } from './createChartData';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Typography from '@material-ui/core/Typography';
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
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflow: 'hidden'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function NavigationControls({ setValue, baseName, value, unit }) {
  const { navigation } = useStyles();
  const back = () => setValue(value + 1)
  const next = () => setValue(value - 1)
  return (
    <div className={navigation}>
      <IconButton onClick={back}>< NavigateBeforeIcon /></IconButton>
      <Typography variant='button' align='center'> {value === 0 ? baseName : `${value} ${unit} ago`}</Typography>
      <IconButton onClick={next} disabled={value === 0}><NavigateNextIcon /></IconButton>
    </div>)
}

export default function Dashboard({ sessions = [] }) {
  const classes = useStyles();
  const [daysAgo, setDay] = React.useState(0);
  const [weeksAgo, setWeek] = React.useState(0);
  const [monthsAgo, setMonth] = React.useState(0);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { dayData, weekData, monthData, names } = createChartData({ sessions, daysAgo, weeksAgo, monthsAgo });

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Navigation page='stats' />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Day */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart sessions={dayData} names={names} title={<NavigationControls value={daysAgo} setValue={setDay} baseName='today' unit='days' />} />
              </Paper>
            </Grid>
            {/* Week */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart sessions={weekData} names={names} title={<NavigationControls value={weeksAgo} setValue={setWeek} baseName='this week' unit='weeks' />}/>
              </Paper>
            </Grid>
            {/* Month */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart title='Month' names={names} sessions={monthData} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}


