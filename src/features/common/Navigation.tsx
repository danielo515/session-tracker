import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import BarChart from '@mui/icons-material/BarChart';
import Timer from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/icons-material/List';

/**
 * @param {String} index
 */
function a11yProps(index: string) {
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
function LinkTab({ label, ...props }: { label: string; to: string; icon: any; value: string }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const Label = smallScreen ? null : <Box display={{ xs: 'none', sm: 'block' }}>{label}</Box>;
  return <Tab component={RouterLink} label={Label} {...props} />;
}

/**
 * @param {Object} props
 * @param {string} props.page
 * */
export default function Navigation({ page }: { page: string }) {
  const knownRoute = ['/stats', '/timer', '/'].includes(page);
  if (!knownRoute) {
    return null;
  }
  return (
    <AppBar position="static">
      <Tabs
        variant="fullWidth"
        value={page}
        aria-label="navigation"
        centered
        indicatorColor="primary"
        textColor="inherit"
      >
        <LinkTab label="List" icon={<List />} to="/" value="/" {...a11yProps('timer')} />
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
