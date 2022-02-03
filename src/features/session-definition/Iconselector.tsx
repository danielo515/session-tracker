import { FixedSizeList as List } from 'react-window';
import { Icons } from '@common/Icon/Icon';
import Autosizer from 'react-virtualized-auto-sizer';
import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';

type Props = {
  icon: string;
  onChange: (icon: string) => void;
  fixedHeight?: boolean;
};

const data = Object.entries(Icons);

export function IconSelector({ icon, onChange, fixedHeight = true }: Props) {
  const [toDelete, setDelete] = useState<string[]>([]);
  useEffect(() => {
    if (toDelete.length > 15) {
      console.log(`.*(${toDelete.join(' |')}).*\\n`);
      setDelete([]);
    }
  }, [toDelete]);
  const theme = useTheme();
  const itemWidth = 64;
  return (
    <Autosizer defaultHeight={300} disableHeight={fixedHeight}>
      {({ height, width }: { height: number; width: number }) => {
        const rowSize = Math.floor(width / itemWidth);
        return (
          <List
            height={fixedHeight ? 300 : height}
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
                        onClick={() => {
                          setDelete(toDelete.concat(name));
                          return onChange(name);
                        }}
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
