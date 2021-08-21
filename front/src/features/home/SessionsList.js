import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import Autosizer from 'react-virtualized-auto-sizer';
import { TaskGroup } from './TaskGroup';
import { useSelectRow } from './redux/selectRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemHeight = 72;
const ListHeight = ItemHeight + 3 * ItemHeight;

/**
 * @param {any[]} items
 */
export function CalculateListHeight(items) {
  return Math.min(ListHeight, ItemHeight + items.length * ItemHeight);
}
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

const Loading = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px');
  return (
    <div className="home-sessions-skeleton">
      {doTimes(isSmallScreen ? 5 : 8)(i => (
        <Skeleton height={ItemHeight} key={i} />
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
  const selectedRow = useRef('');
  const start = useCallback(e => startSession({ name: e.currentTarget.id }), [startSession]);
  const edit = useCallback(e => editSession(e.currentTarget.id), [editSession]);
  return (
    <div className={clsx(classes.root, 'home-sessions-list')}>
      <VirtualList
        data={sessions}
        itemSize={idx => {
          const sessionGroup = sessions[idx];
          return sessionGroup.name === selectedRow.current
            ? CalculateListHeight(sessionGroup.sessions)
            : ItemHeight;
        }}
        row={props => {
          const { index, style, data, resizeList } = props;
          const item = data[index];

          return (
            <div style={style} className="virtual-node">
              <TaskGroup
                {...item}
                startSession={start}
                editSession={edit}
                onToggle={sessionName => {
                  selectedRow.current = sessionName;
                  resizeList();
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
}

SessionsList.propTypes = {
  sessions: PropTypes.array,
  startSession: PropTypes.func.isRequired,
  editSession: PropTypes.func.isRequired,
};
SessionsList.defaultProps = {
  sessions: [],
};

/**
 *
 * @template {{name: string, id?: string}} T
 * @param {number} idx
 * @param {T[]} data
 */
const getIdOrName = (idx, data) => data[idx].id || data[idx].name;
/**
 * @template T
 * @typedef {Object} VirtualProps
 * @property {T[]} data
 * @property { (props:{data: T[], style: Object, index: number, resizeList: () => any}) => any } row
 * @property {(i:number) => number} itemSize
 */
/**
 * @template T
 * @param {VirtualProps<T>} props **/
export function VirtualList({ data, row, itemSize }) {
  const list = useRef();
  const resizeList = () => {
    if (list.current) {
      // list.current.scrollToItem(refreshIdx, 'start');
      list.current.resetAfterIndex(0);
    }
  };
  return data.length ? (
    <Autosizer>
      {({ height, width }) => (
        <VariableSizeList
          innerElementType={List}
          className={'home-sessions-list'}
          height={height}
          width={width}
          itemSize={itemSize}
          estimatedItemSize={ItemHeight}
          itemCount={data.length}
          itemData={data}
          itemKey={getIdOrName}
          ref={list}
        >
          {props => row({ ...props, resizeList })}
        </VariableSizeList>
      )}
    </Autosizer>
  ) : (
    <Loading />
  );
}
