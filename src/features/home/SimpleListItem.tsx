import { useAppDispatch } from '@common/configStore';
import { Icons } from '@common/Icon/Icon';
import { push } from '@lagunovsky/redux-react-router';
import { PlayCircleOutline } from '@mui/icons-material';
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  styled,
} from '@mui/material';
import { SessionGroup } from '@types';
import { selectDefinition } from 'features/session-definition/selectDefinition';
import { validateIcon } from 'features/session-definition/validateIcon';
import { formatStartDate, msToHuman } from 'formatters/formatDateDiff';
import useAppSelector from 'hooks/useSelector';
import React from 'react';
import { Merge } from 'type-fest';
const PREFIX = 'TaskGroup';

const classes = {
  rightItem: `${PREFIX}-rightItem`,
  leftItem: `${PREFIX}-leftItem`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',

  [`& .${classes.rightItem}`]: {
    flex: '0 1 25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  [`& .${classes.leftItem}`]: {
    flex: '1 1 auto',
  },
}));
type Props = Merge<
  SessionGroup,
  {
    startSession: React.MouseEventHandler<HTMLElement>;
  }
>;

export const SimpleListItem = ({ name, total, lastRun, startSession }: Props) => {
  const dispatch = useAppDispatch();
  const destination = `/detail/${name}`;
  const { icon, color } = useAppSelector(
    (state) => selectDefinition(state, name) ?? { icon: 'Default', color: 'pink' },
  );
  const Icon = validateIcon(icon) ? Icons[icon] : Icons.Default;
  const navigate = () => {
    dispatch(push(destination));
  };
  return (
    <Root onClick={navigate} data-name={name}>
      <ListItemIcon>
        <Icon color={color} />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={formatStartDate(lastRun)}
        //   className={classes.leftItem}
      />

      <ListItemText primary="Today" secondary={msToHuman(total)} className={classes.rightItem} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" id={name} onClick={startSession} size="large">
          <PlayCircleOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </Root>
  );
};
