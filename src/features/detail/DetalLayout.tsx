import { Box, Container, styled } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DetailLayout = () => {
  return (
    <StyledContainer>
      <Container sx={{ flex: 1 }}>
        <Outlet />
      </Container>
      <Navigation />
    </StyledContainer>
  );
};
