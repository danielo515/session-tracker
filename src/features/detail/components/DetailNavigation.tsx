import { EditOutlined, InfoOutlined } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const path = useLocation().pathname;
  return (
    <BottomNavigation value={path}>
      <BottomNavigationAction
        label="Overview"
        value="/detail"
        icon={<InfoOutlined />}
        component={Link}
        to="/detail"
      />
      <BottomNavigationAction
        label="Edit"
        value="/detail/edit"
        icon={<EditOutlined />}
        component={Link}
        to="/detail/edit"
      />
    </BottomNavigation>
  );
};
