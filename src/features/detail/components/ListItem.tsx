import { styled, ListItem, ListItemText, IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import React from 'react';

const Item = styled(ListItem)(({ theme }) => ({
  borderRadius: '5px',
  border: `1px solid ${theme.palette.secondary.light}`,
  margin: `${theme.spacing(1)} 0`,
}));

type Props = {
  title: string;
  subTitle: string;
  onClick: () => unknown;
};

export const DetailListItem = ({ title, subTitle, onClick }: Props) => {
  return (
    <Item
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
          <DeleteOutlined />
        </IconButton>
      }
    >
      <ListItemText primary={title} secondary={subTitle}></ListItemText>
    </Item>
  );
};
