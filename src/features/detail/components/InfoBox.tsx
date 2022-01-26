import React from 'react';
import { Box } from '@mui/system';
import { IconProps, styled } from '@mui/material';
import { formatMinutes4Human } from 'formatters/formatMinutes4Human';
import { SvgIconComponent } from '@mui/icons-material';

const Root = styled(Box)(({ theme }) => ({
  // border: '1px solid tomato',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.spacing(2)}  ${theme.spacing(1)}`,
  flex: 1,
  position: 'relative',
}));

const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.subtitle1,
  margin: 0,
}));

const Subtitle = styled('h3')(({ theme }) => ({
  ...theme.typography.subtitle2,
}));

const IconPosition = styled('div')(({ theme }) => ({
  top: theme.spacing(1),
  right: theme.spacing(1),
  position: 'absolute',
  color: theme.palette.primary.contrastText,
}));

type Props = {
  title: string;
  amountInMinutes: number;
  Icon: React.ComponentType<SvgIconComponent>;
};

export const InfoBox = ({ title, amountInMinutes, Icon }: Props) => {
  return (
    <Root>
      <Title>{title}</Title>
      <Subtitle>{formatMinutes4Human(amountInMinutes, false)}</Subtitle>
      <IconPosition>
        <Icon />
      </IconPosition>
    </Root>
  );
};
