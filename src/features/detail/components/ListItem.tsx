import { styled, ListItem, ListItemText, IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import React from 'react';

const Item = styled(ListItem)(({ theme }) => ({
  borderRadius: '5px',
  border: `1px solid ${theme.palette.secondary.light}`,
  margin: `${theme.spacing(1)} 0`,
}));

export const DetailListItem = () => {
  return (
    <Item
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteOutlined />
        </IconButton>
      }
    >
      <ListItemText
        primary="2 hours 5 minutes"
        secondary="2020-12-01 16:00 -> 18:00"
      ></ListItemText>
    </Item>
  );
};
