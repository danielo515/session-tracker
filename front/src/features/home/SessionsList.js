import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import format from 'date-fns/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autosizer from 'react-virtualized-auto-sizer';
import { formatMinutes4Human } from '../../formatters/formatMinutes4Human';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

const formatStart = 'yyy-MM-dd HH:mm';
const formatHour = 'HH:mm';
/**
 * @typedef {import('@types').Session} Session
 * @typedef {import('@types').SessionGroup} SessionGroup
 */

/** @typedef {Object} PropsRender
 * @property {(item: Session) => any} secondaryAction
 * @property {(id:string) => any} primaryAction
 * @property {*} Icon
 */

/**
 *  @param {PropsRender} props
 * @returns {(props:{index:number, style: any, data: Session[]}) => JSX.Element}
 * **/
const renderRow = ({ secondaryAction, primaryAction, Icon }) => props => {
  const { index, style, data } = props;
  const item = data[index];
  const { name, startDate, endDate, id } = item;
  const start = new Date(startDate);
  const end = new Date(endDate || Date.now());
  const duration = differenceInMinutes(end, start);
  const secondary = useCallback(() => secondaryAction(item), [secondaryAction, id]);
  const primary = useCallback(() => primaryAction(id), [primaryAction, id]);

  return (
    <ListItem
      ContainerProps={{ style }}
      key={id || index}
      ContainerComponent="div"
      button
      onClick={primary}
    >
      <ListItemText
        primary={name}
        className="sl-left-item"
        secondary={format(start, formatStart)}
      />
      <ListItemText primary={formatMinutes4Human(duration)} secondary={format(end, formatHour)} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={secondary}>
          <Icon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

renderRow.propTypes = {
  data: PropTypes.array,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

/**
 * @template T
 * @template {(i:number) => T} cb
 * @param {number} times
 * @returns {(fn:cb) => T[]}
 */
const doTimes = times => fn => {
  const res = [];
  for (; times; times--) res.push(fn(times));
  return res;
};

const Loading = ({ isSmallScreen }) => {
  return (
    <div className="home-sessions-skeleton">
      {doTimes(isSmallScreen ? 5 : 8)(i => (
        <Skeleton height={46} key={i} />
      ))}
    </div>
  );
};

/** @typedef {Object} Props
 * @property {SessionGroup[]} sessions
 * @property {()=>any} secondaryAction
 * @property {(id:string) => any} primaryAction
 */

/** @param {Props} props **/
export default function SessionsList({ sessions, secondaryAction, primaryAction, icon: Icon }) {
  const smallScreen = useMediaQuery('(max-width: 600px');
  const classes = useStyles();
  const itemCount = sessions.length;
  const row = renderRow({ Icon, secondaryAction, primaryAction });
  return (
    <div className={clsx(classes.root, 'home-sessions-list')}>
      <Autosizer>
        {({ height, width }) =>
          itemCount ? (
            <FixedSizeList
              className={'home-sessions-list'}
              height={height}
              width={width}
              itemSize={72}
              itemCount={itemCount}
              itemData={sessions}
            >
              {row}
            </FixedSizeList>
          ) : (
            <Loading isSmallScreen={smallScreen} />
          )
        }
      </Autosizer>
    </div>
  );
}

SessionsList.propTypes = {
  icon: PropTypes.node.isRequired,
  sessions: PropTypes.array,
  secondaryAction: PropTypes.func.isRequired,
  primaryAction: PropTypes.func.isRequired,
};
SessionsList.defaultProps = {
  sessions: [],
};
