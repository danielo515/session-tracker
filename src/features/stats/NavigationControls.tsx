import React from 'react';
import IconButton from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import { useNavigateDays } from './redux/navigateDays';
import { useNavigateWeeks } from './redux/navigateWeeks';
import { styled } from '@mui/material/styles';

type PropsA = {
  next: () => any;
  back: () => any;
  baseName?: never;
  unit?: never;
  text: string;
  value: number;
};

type PropsB = {
  next: () => any;
  back: () => any;
  baseName: string;
  unit: string;
  text?: never;
  value: number;
};

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function NavigationControlsBase({ next, back, baseName, value, text, unit }: PropsA | PropsB) {
  return (
    <Root>
      <IconButton onClick={back} size="large">
        <NavigateBeforeIcon />
      </IconButton>
      <Typography variant="button" align="center">
        {text || (value === 0 ? baseName : `${value} ${unit} ago`)}
      </Typography>
      <IconButton onClick={next} disabled={value === 0} size="large">
        <NavigateNextIcon />
      </IconButton>
    </Root>
  );
}

const formatDaysAgo = (ago: number) =>
  ago > 0 ? format(subDays(new Date(), ago), 'E d MMM') : 'Today';

export function DaysNavigator() {
  const { nextDay, previousDay, daysAgo } = useNavigateDays();
  const text = formatDaysAgo(daysAgo);
  return <NavigationControlsBase value={daysAgo} next={previousDay} back={nextDay} text={text} />;
}

export function WeeksNavigator() {
  const { nextWeek, previousWeek, weeksAgo } = useNavigateWeeks();
  return (
    <NavigationControlsBase
      value={weeksAgo}
      next={previousWeek}
      back={nextWeek}
      baseName="this week"
      unit="weeks"
    />
  );
}
