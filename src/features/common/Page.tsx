import { styled } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
};

const Root = styled('div')({
  padding: '1rem 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

export default function Page({ children, className = '', scroll = false }: Props) {
  return (
    <Root className={className} sx={{ overflowY: scroll ? 'scroll' : 'inherit' }}>
      {children}
    </Root>
  );
}
