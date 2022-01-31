import { useAppDispatch } from '@common/configStore';
import { Icons } from '@common/Icon/Icon';
import { push } from '@lagunovsky/redux-react-router';
import { PlayCircleOutline } from '@mui/icons-material';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  styled,
} from '@mui/material';
import { SessionGroup } from '@types';
import { formatDistanceToNow } from 'date-fns/esm';
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
const Root = styled(ListItem)(({ theme }) => ({
  display: 'flex',

  [`& .${classes.rightItem}`]: {
    flex: '0 1 25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  const TimeInfoLabel = total ? 'Today' : 'Last';
  const TimeInfoData = total ? msToHuman(total) : formatDistanceToNow(new Date(lastRun));
  const Icon = validateIcon(icon) ? Icons[icon] : Icons.Default;
  const navigate = () => {
    dispatch(push(destination));
  };
  return (
    <Root
      onClick={navigate}
      data-name={name}
      // @ts-expect-error this is deprecated, but it doesn't have an equivalent
      button
    >
      <ListItemIcon>
        <Icon color={color} />
      </ListItemIcon>
      <ListItemText primary={name} secondary={formatStartDate(lastRun)} />

      <ListItemText
        primary={TimeInfoLabel}
        secondary={TimeInfoData}
        className={classes.rightItem}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" id={name} onClick={startSession} size="large">
          <PlayCircleOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </Root>
  );
};
