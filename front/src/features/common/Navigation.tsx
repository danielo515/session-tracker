import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import BarChart from '@material-ui/icons/BarChart';
import Timer from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/icons/List';

/**
 * @param {String} index
 */
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

/**
 *
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.to
 * @param {any} props.icon
 * @param {String} props.value
 */
function LinkTab({ label, ...props }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const Label = smallScreen ? null : <Box display={{ xs: 'none', sm: 'block' }}>{label}</Box>;
  return <Tab component={RouterLink} label={Label} {...props} />;
}

/**
 * @param {Object} props
 * @param {string} props.page
 * */
export default function Navigation({ page }) {
  return (
    <AppBar position="static">
      <Tabs variant="fullWidth" value={page} aria-label="navigation" centered>
        <LinkTab label="Timer" icon={<List />} to="/" value="/" {...a11yProps('timer')} />
        <LinkTab
          label="Stats"
          icon={<BarChart />}
          to="/stats"
          value="/stats"
          {...a11yProps('stats')}
        />
        <LinkTab
          label="Timer"
          icon={<Timer />}
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
