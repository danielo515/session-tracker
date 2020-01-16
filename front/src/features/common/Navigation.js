import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink } from 'react-router-dom';


function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component={RouterLink}
            {...props}
        />
    );
}

export default function Navigation({page}) {

    const [value, setValue] = React.useState(page);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <AppBar position="static">
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="navigation"
            >
                <LinkTab label="Timer" to="/" value='/' {...a11yProps('timer')} />
                <LinkTab label="Stats" to="/stats" value='/stats' {...a11yProps('stats')} />
            </Tabs>
        </AppBar>

    );
}

Navigation.propTpes = {
    page: PropTypes.string.isRequired,
}