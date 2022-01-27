import { Container, styled } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DetailLayoutHeader } from './components/DetailLayoutHeader';
import { Navigation } from './components/DetailNavigation';

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DetailLayout = () => {
  return (
    <StyledContainer>
      <DetailLayoutHeader />
      <Container sx={{ flex: 1 }}>
        <Outlet />
      </Container>
      <Navigation />
    </StyledContainer>
  );
};
