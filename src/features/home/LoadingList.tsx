import React from 'react';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { doTimes } from './doTimes';
import { ItemHeight } from './SessionsList';

// const NestedItemHeight = 400;
// const formatHour = 'HH:mm';
const LoadingWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
}));

export const Loading = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px');
  return (
    <LoadingWrapper>
      {doTimes(isSmallScreen ? 5 : 8)((i) => (
        <Skeleton height={ItemHeight} key={i} />
      ))}
    </LoadingWrapper>
  );
};
