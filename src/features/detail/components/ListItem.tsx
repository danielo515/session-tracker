import { styled, ListItem, ListItemText, IconButton, ListItemProps } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import React, { forwardRef } from 'react';

const Item = styled(ListItem)(({ theme }) => ({
  borderRadius: '5px',
  border: `1px solid ${theme.palette.secondary.light}`,
  margin: `${theme.spacing(1)} 0`,
}));

type Props = {
  title: string;
  subTitle: string;
  onClick: () => unknown;
} & ListItemProps;

export const DetailListItem = forwardRef<any, Props>(function DetailListItem(
  { title, subTitle, onClick, ...props }: Props,
  ref,
) {
  return (
    <Item
      {...props}
      ref={ref}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
          <DeleteOutlined />
        </IconButton>
      }
    >
      <ListItemText primary={title} secondary={subTitle}></ListItemText>
    </Item>
  );
});
