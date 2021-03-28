import React from 'react';
import IconButton from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Dashboard';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import { useNavigateDays } from './redux/navigateDays';
import { useNavigateWeeks } from './redux/navigateWeeks';

/** @typedef {Object} PropsA
 * @property {() => any} next
 * @property {() => any} back
 * @property {never} [ baseName ]
 * @property {never} [ unit ]
 * @property {string} text
 * @property {number} value
 */
/** @typedef {Object} PropsB
 * @property {() => any} next
 * @property {() => any} back
 * @property {string} baseName
 * @property {string} unit
 * @property {never} [ text ]
 * @property {number} value
 */
/**
 * @param {PropsA|PropsB} props
 */
function NavigationControlsBase({ next, back, baseName, value, text, unit }) {
  // @ts-ignore
  const { navigation } = useStyles();
  return (
    <div className={navigation}>
      <IconButton onClick={back}>
        <NavigateBeforeIcon />
      </IconButton>
      <Typography variant="button" align="center">
        {text || (value === 0 ? baseName : `${value} ${unit} ago`)}
      </Typography>
      <IconButton onClick={next} disabled={value === 0}>
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}
/** @typedef {Object} NPropsA
 * @property {(n:number) => any} setValue
 * @property {never} [ baseName ]
 * @property {never} [ unit ]
 * @property {string} text
 * @property {number} value
 */
/** @typedef {Object} NPropsB
 * @property {(n:number) => any} setValue
 * @property {string} baseName
 * @property {string} unit
 * @property {never} [ text ]
 * @property {number} value
 */
/**
 * @param {NPropsA|NPropsB} props
 */
export function NavigationControls({ setValue, baseName, value, text, unit }) {
  const back = () => setValue(value + 1);
  const next = () => setValue(value - 1);
  return (
    <NavigationControlsBase
      baseName={baseName}
      next={next}
      back={back}
      value={value}
      text={text}
      unit={unit}
    />
  );
}

/**
 * @param {number} ago
 */
const formatDaysAgo = ago => (ago > 0 ? format(subDays(new Date(), ago), 'E d MMM') : 'Today');

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
