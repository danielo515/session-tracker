import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';
import clsx from 'clsx';
import List from '@mui/material/List';
import Autosizer from 'react-virtualized-auto-sizer';
import { SessionGroup } from '@types';
import { Loading } from './LoadingList';
import { SimpleListItem } from './SimpleListItem';

const PREFIX = 'SessionsList';

const classes = {
  root: `${PREFIX}-root`,
};

export const ItemHeight = 72;
const ListHeight = ItemHeight + 3 * ItemHeight;

export function CalculateListHeight(items: unknown[]) {
  return Math.min(ListHeight, ItemHeight + items.length * ItemHeight);
}
type Props = {
  sessions: SessionGroup[];
  startSession: (i: { name: string }) => unknown;
  editSession: (id: string) => unknown;
};

export default function SessionsList({ sessions, startSession }: Props) {
  // We need to use a ref because using the hook will re-render the entire list which will kill the animation
  // of each item esxpanding or collapsing. The child component will inform us on the onToggle handler.
  // I don't like it, but it works for now
  const selectedRow = useRef('');
  const start = useCallback((e) => startSession({ name: e.currentTarget.id }), [startSession]);
  return (
    <div className={clsx(classes.root, 'home-sessions-list')}>
      <VirtualList
        data={sessions}
        itemSize={(idx) => {
          const sessionGroup = sessions[idx];
          return sessionGroup.name === selectedRow.current
            ? CalculateListHeight(sessionGroup.sessions)
            : ItemHeight;
        }}
        row={({ index, style, data }) => {
          const item = data[index];

          return (
            <div style={style} className="virtual-node">
              <SimpleListItem {...item} startSession={start} />
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

type VirtualProps<T> = {
  data: T[];
  row: (props: {
    data: T[];
    style: React.CSSProperties;
    index: number;
    resizeList: () => unknown;
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
      {({ height, width }: { height: number; width: number }) => (
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
          {(props) => row({ ...props, resizeList })}
        </VariableSizeList>
      )}
    </Autosizer>
  ) : (
    <Loading />
  );
}
