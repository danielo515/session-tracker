import { EditOutlined, InfoOutlined } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, styled } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Wrapper = styled(Box)(({ theme }) => ({
  // padding: theme.spacing(2),
  paddingTop: 0,
  backgroundColor: theme.palette.primary.main,
}));

export const Navigation = () => {
  const path = useLocation().pathname;
  return (
    <Wrapper>
      <BottomNavigation
        value={path}
        sx={{ borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }}
      >
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
    </Wrapper>
  );
};
