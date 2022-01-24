import { BottomNavigation, Box, Container, styled } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DetailLayout = () => {
  return (
    <StyledContainer>
      <Box flex={1}>
        <Outlet />
      </Box>
      <BottomNavigation />
    </StyledContainer>
  );
};
