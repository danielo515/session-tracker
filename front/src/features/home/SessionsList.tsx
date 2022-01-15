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
import { SessionGroup } from '@types';
import { doTimes } from './doTimes';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemHeight = 72;
const ListHeight = ItemHeight + 3 * ItemHeight;

export function CalculateListHeight(items: unknown[]) {
  return Math.min(ListHeight, ItemHeight + items.length * ItemHeight);
}
// const NestedItemHeight = 400;
// const formatHour = 'HH:mm';

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

type Props = {
  sessions: SessionGroup[];
  startSession: (i: { name: string }) => any;
  editSession: (id: string) => any;
};

export default function SessionsList({ sessions, startSession, editSession }: Props) {
  const classes = useStyles();
  // We need to use a ref because using the hook will re-render the entire list which will kill the animation
  // of each item esxpanding or collapsing. The child component will inform us on the onToggle handler.
  // I don't like it, but it works for now
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
        row={({ index, style, data, resizeList }) => {
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

const getIdOrName = <T extends { name: string; id?: string }>(idx: number, data: T[]) =>
  data[idx].id || data[idx].name;
/**
 * @template T
 * @typedef {Object} VirtualProps
 * @property {T[]} data
 * @property { (props:{data: T[], style: Object, index: number, resizeList: () => any}) => any } row
 * @property {(i:number) => number} itemSize
 */

type VirtualProps<T> = {
  data: T[];
  row: (props: {
    data: T[];
    style: React.CSSProperties;
    index: number;
    resizeList: () => any;
  }) => any;
  itemSize: (i: number) => number;
};

export function VirtualList<T>({ data, row, itemSize }: VirtualProps<T>) {
  const list = useRef<{ resetAfterIndex: (idx: number) => void }>();
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
          //@ts-expect-error stupid wrong types
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
