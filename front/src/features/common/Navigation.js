import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import BarChart from '@material-ui/icons/BarChart';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink } from 'react-router-dom';
import AlarmIcon from '@material-ui/icons/AccessAlarms';
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab({ label, ...props }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const Label = smallScreen ? null : <Box display={{ xs: 'none', sm: 'block' }}>{label}</Box>;
  return <Tab component={RouterLink} label={Label} {...props} />;
}

export default function Navigation({ page }) {
  return (
    <AppBar position="static">
      <Tabs variant="fullWidth" value={page} aria-label="navigation" centered>
        <LinkTab label="Timer" icon={<AlarmIcon />} to="/" value="/" {...a11yProps('timer')} />
        <LinkTab
          label="Stats"
          icon={<BarChart />}
          to="/stats"
          value="/stats"
          {...a11yProps('stats')}
        />
        <LinkTab
          label="Timer"
          icon={<BarChart />}
          to="/timer"
          value="/timer"
          {...a11yProps('stats')}
        />
      </Tabs>
    </AppBar>
  );
}

Navigation.propTpes = {
  page: PropTypes.string.isRequired,
};
