import { FixedSizeList as List } from 'react-window';
import * as Icons from '@common/Icon/Icon';
import Autosizer from 'react-virtualized-auto-sizer';
import React from 'react';
import { Box, Button, useTheme } from '@material-ui/core';

/**
 * @typedef {Object} Props
 * @property {string} icon
 * @property {(icon:string)=>void} onChange
 */

/** @param {Props} props **/
export function IconSelector({ icon, onChange }) {
  const data = Object.entries(Icons);
  const theme = useTheme();
  const itemWidth = 64;
  return (
    <Autosizer defaultHeight={300} disableHeight>
      {({ height, width }) => {
        const rowSize = Math.floor(width / itemWidth);
        return (
          <List
            height={300}
            itemCount={Math.round(data.length / rowSize)}
            itemSize={itemWidth}
            width={width}
            overscanCount={3}
          >
            {({ index, style }) => {
              const offset = index * rowSize;
              const row = data.slice(offset, offset + rowSize);
              return (
                <Box display="flex" flexDirection="row" style={style}>
                  {row.map(([name, Icon]) => {
                    const selected = name === icon;
                    return (
                      <Button
                        key={name}
                        onClick={() => onChange(name)}
                        color={selected ? 'primary' : 'secondary'}
                        variant={selected ? 'outlined' : undefined}
                      >
                        <Icon
                          color={selected ? theme.palette.primary.main : theme.palette.divider}
                        />
                      </Button>
                    );
                  })}
                </Box>
              );
            }}
          </List>
        );
      }}
    </Autosizer>
  );
}
