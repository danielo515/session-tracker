import React from 'react';
import { Box } from '@mui/system';
import { styled } from '@mui/material';
import { formatMinutes4Human } from 'formatters/formatMinutes4Human';

const Root = styled(Box)<{ variant: 'main' | 'secondary' }>(
  ({ theme: { spacing, palette, shape }, variant }) => {
    const variants = {
      main: {
        color: palette.info.contrastText,
        backgroundColor: palette.info.light,
      },
      secondary: {
        color: palette.secondary.contrastText,
        backgroundColor: palette.secondary.light,
      },
    };
    return {
      ...variants[variant],
      borderRadius: shape.borderRadius,
      display: 'flex',
      flexDirection: 'column',
      padding: `${spacing(2)}  ${spacing(1)}`,
      flex: 1,
      position: 'relative',
    };
  },
);

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
  Icon: React.ComponentType<any>;
  variant: 'main' | 'secondary';
};

export const InfoBox = ({ title, amountInMinutes, Icon, variant = 'main' }: Props) => {
  return (
    <Root variant={variant}>
      <Title>{title}</Title>
      <Subtitle>{formatMinutes4Human(amountInMinutes, false)}</Subtitle>
      <IconPosition>
        <Icon />
      </IconPosition>
    </Root>
  );
};
