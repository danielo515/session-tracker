import React, { useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Autosizer from 'react-virtualized-auto-sizer';
import { TaskGroup } from './TaskGroup';

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
export function CalculateListHeight(items: any) {
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
const doTimes = (times: any) => (fn: any) => {
  const res = [];
  for (; times; times--) res.push(fn(times));
  return res;
};

const Loading = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px');
  return (
    <div className="home-sessions-skeleton">
      {doTimes(isSmallScreen ? 5 : 8)((i: any) => <Skeleton height={ItemHeight} key={i} />)}
    </div>
  );
};

type OwnSessionsListProps = {
    sessions?: any[];
    startSession: (...args: any[]) => any;
    editSession: (...args: any[]) => any;
};

// @ts-expect-error ts-migrate(2565) FIXME: Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type SessionsListProps = OwnSessionsListProps & typeof SessionsList.defaultProps;

/** @typedef {Object} Props
 * @property {SessionGroup[]} sessions
 * @property {(i:{name: string}) => any} startSession
 * @property {(id:string) => any} editSession
 */

/** @param {Props} props **/
export default function SessionsList({ sessions, startSession, editSession }: SessionsListProps) {
  const classes = useStyles();
  const openRow = useRef('');
  const start = useCallback(e => startSession({ name: e.currentTarget.id }), [startSession]);
  const edit = useCallback(e => editSession(e.currentTarget.id), [editSession]);
  return (
    <div className={clsx(classes.root, 'home-sessions-list')}>
      <VirtualList
        data={sessions}
        itemSize={(idx: any) => {
          const sessionGroup = sessions[idx];
          return (sessionGroup as any).name === openRow.current
    ? CalculateListHeight((sessionGroup as any).sessions)
    : ItemHeight;
        }}
        row={(props: any) => {
          const { index, style, data, resizeList } = props;
          const item = data[index];

          return (
            <div style={style} className="virtual-node">
              <TaskGroup
                {...item}
                startSession={start}
                editSession={edit}
                onOpen={(name: any) => {
                  openRow.current = name;
                  resizeList();
                }}
                onClose={() => {
                  openRow.current = '';
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
SessionsList.defaultProps = {
  sessions: [],
};

/**
 *
 * @template {{name: string, id?: string}} T
 * @param {number} idx
 * @param {T[]} data
 */
const getIdOrName = (idx: any, data: any) => data[idx].id || data[idx].name;
/**
 * @template T
 * @typedef {Object} VirtualProps
 * @property {T[]} data
 * @property { (props:{data: T[], style: Object, index: number}) => any } row
 * @property {(i:number) => number} itemSize
 */
/**
 * @template T
 * @param {VirtualProps<T>} props **/
export function VirtualList({
  data,
  row,
  itemSize
}: any) {
  const list = useRef();
  const resizeList = () => {
    if (list.current) {
      // list.current.scrollToItem(refreshIdx, 'start');
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      list.current.resetAfterIndex(0);
    }
  };
  return data.length ? (
    <Autosizer>
      {({
        height,
        width
      }: any) => (
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
