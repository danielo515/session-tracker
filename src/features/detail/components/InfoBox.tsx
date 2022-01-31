import React from 'react';
import { Box } from '@mui/system';
import { styled } from '@mui/material';
import { formatMinutes4Human } from 'formatters/formatMinutes4Human';

type VariantProps = { variant: 'main' | 'secondary'; intensity?: 'dark' | 'light' };

const Root = styled(Box)<VariantProps>(({ theme: { spacing, palette, shape }, variant }) => {
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
});

const Bubble = styled('div', {
  shouldForwardProp(propName) {
    return !/position(Y|X)/.test(String(propName));
  },
})<VariantProps & { positionY: number; positionX?: number }>(
  ({
    theme: { palette },
    variant = 'main',
    intensity = 'dark',
    positionY = -30,
    positionX = -10,
  }) => {
    const size = '100px';
    const variants = {
      main: {
        backgroundColor: intensity === 'dark' ? palette.info.dark : palette.info.main,
      },
      secondary: {
        backgroundColor: intensity === 'dark' ? palette.secondary.dark : palette.secondary.main,
      },
    };
    return {
      ...variants[variant],
      opacity: 0.8,
      position: 'absolute',
      right: 0,
      top: 0,
      marginTop: positionY,
      marginRight: positionX,
      width: size,
      height: size,
      borderRadius: '100%',
    };
  },
);

const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.subtitle1,
  margin: 0,
  position: 'relative',
  fontSize: '1.2rem',
}));

const Subtitle = styled('h3')(({ theme }) => ({
  ...theme.typography.subtitle2,
  margin: 0,
  marginTop: theme.spacing(1),
  position: 'relative',
  fontSize: '1.2rem',
  lineHeight: '1.75rem',
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
      <Bubble variant={variant} positionY={-50} positionX={-10} intensity="light" />
      <Bubble variant={variant} positionY={-30} positionX={-50} intensity="dark" />

      <Title>{title}</Title>
      <Subtitle>{formatMinutes4Human(amountInMinutes, false)}</Subtitle>
      {/* <IconPosition>
        <Icon />
      </IconPosition> */}
    </Root>
  );
};
