import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import Autosizer from 'react-virtualized-auto-sizer';
import { TaskGroup } from './TaskGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemHeight = 72;
// const NestedItemHeight = 400;
// const formatHour = 'HH:mm';
/**
 * @typedef {import('@types').Session} Session
 * @typedef {import('@types').SessionGroup} SessionGroup
 */

/** @typedef {Object} PropsRender
 * @property {(item: {name: string}) => any} startSession
 * @property {(id:string) => any} editSession
 */

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
 * @property {(i:{name: string}) => any} startSession
 * @property {(id:string) => any} editSession
 */

/** @param {Props} props **/
export default function SessionsList({ sessions, startSession, editSession }) {
  const classes = useStyles();
  const [openRow, setOpenRow] = useState('');
  const [refreshIdx, setRefreshIdx] = useState(0);
  /** @returns { React.MouseEventHandler<HTMLDivElement> }*/
  const activateRow = idx => e => {
    const name = '' + e.currentTarget.getAttribute('data-name');
    setRefreshIdx(idx);
    setOpenRow(name === openRow ? '' : name);
  };
  const start = useCallback(e => startSession({ name: e.currentTarget.id }), [startSession]);
  const edit = useCallback(e => editSession(e.currentTarget.id), [editSession]);
  return (
    <div className={clsx(classes.root, 'home-sessions-list')}>
      <VirtualList
        data={sessions}
        refreshIdx={refreshIdx}
        itemSize={idx => {
          const sessionGroup = sessions[idx];
          return sessionGroup.name === openRow
            ? sessionGroup.sessions.length * ItemHeight + ItemHeight
            : 72;
        }}
        row={props => {
          const { index, style, data } = props;
          const item = data[index];

          return (
            <TaskGroup
              {...item}
              style={style}
              startSession={start}
              editSession={edit}
              activeRow={openRow}
              activateRow={activateRow(index)}
            />
          );
        }}
      />
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

/**
 * @template T
 * @typedef {Object} VirtualProps
 * @property {T[]} data
 * @property { (props:{data: T[], style: Object, index: number}) => any } row
 * @property {number} refreshIdx
 * @property {(i:number) => number} itemSize
 */

/**
 * @template T
 * @param {VirtualProps<T>} props **/
export function VirtualList({ data, row, itemSize, refreshIdx }) {
  const smallScreen = useMediaQuery('(max-width: 600px');
  const list = useRef();
  if (list.current) {
    // list.current.scrollToItem(refreshIdx, 'start');
    list.current.resetAfterIndex(Math.max(refreshIdx - 1, 0));
  }
  return data.length ? (
    <Autosizer>
      {({ height, width }) => (
        <List>
          <VariableSizeList
            className={'home-sessions-list'}
            height={height}
            width={width}
            itemSize={itemSize}
            estimatedItemSize={ItemHeight}
            itemCount={data.length}
            itemData={data}
            ref={list}
            useIsScrolling
          >
            {row}
          </VariableSizeList>
        </List>
      )}
    </Autosizer>
  ) : (
    <Loading isSmallScreen={smallScreen} />
  );
}
