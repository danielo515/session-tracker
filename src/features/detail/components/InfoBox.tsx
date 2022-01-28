import React from 'react';
import { Box } from '@mui/system';
import { styled } from '@mui/material';
import { formatMinutes4Human } from 'formatters/formatMinutes4Human';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { LowDetailBars } from './LowDetailBars';

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
      overflow: 'hidden',
    };
  },
);

const GraphWrapper = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Bubble = styled('div')(({ theme: { palette } }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  marginTop: -10,
  marginRight: -10,
  width: '80px',
  height: '80px',
  borderRadius: '100%',
  backgroundColor: palette.secondary.main,
}));

const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.subtitle1,
  margin: 0,
  position: 'relative',
  fontSize: '1.2rem',
}));

const Subtitle = styled('h3')(({ theme }) => ({
  ...theme.typography.subtitle2,
  position: 'relative',
  // fontSize: '1.5rem',
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
      <Bubble />
      <GraphWrapper>
        <ParentSize>
          {({ width, height }) => <LowDetailBars width={width} height={height} />}
        </ParentSize>
      </GraphWrapper>
      <Title>{title}</Title>
      <Subtitle>{formatMinutes4Human(amountInMinutes, false)}</Subtitle>
      <IconPosition>
        <Icon />
      </IconPosition>
    </Root>
  );
};
