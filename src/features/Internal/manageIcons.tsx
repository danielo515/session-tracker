import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  ButtonGroup,
  Container,
} from '@material-ui/core';
import * as Icons from '@common/Icon/Icon';
import useAppSelector from 'hooks/useSelector';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetSelection, selectIcon } from './redux';
import { useAppDispatch } from '@common/configStore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { replace } from '@lagunovsky/redux-react-router';

const allIcons = Object.entries(Icons).sort(([a], [b]) => a.localeCompare(b));

interface IconBtnProps {
  Icon: any;
  name: string;
}

const IconBtn = ({ Icon, name }: IconBtnProps) => {
  const dispatch = useDispatch();
  const selected = useAppSelector((state) => state.manageIcons.icons.includes(name));
  const onClick = () => dispatch(selectIcon(name));
  return (
    <Button
      aria-label={`icon-${name}`}
      onClick={onClick}
      disableFocusRipple
      disableRipple
      disableTouchRipple
      variant={selected ? 'outlined' : undefined}
      color={selected ? 'primary' : 'secondary'}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Icon color={selected ? '#7589f8' : '#959595'} />
        {/* {name.replace(/outlined|outline|local|directions/gi, '')} */}
      </Box>
    </Button>
  );
};

const Controls = () => {
  const dispatch = useAppDispatch();
  const { icons } = useAppSelector(({ manageIcons }) => {
    return {
      icons: manageIcons.icons,
    };
  });
  const regex = `.*(${icons.join('|')}).*\\n`;
  return (
    <Box pt={2}>
      <Typography variant="subtitle1">Icons on list {icons.length}</Typography>
      <ButtonGroup variant="outlined" color="primary" aria-label="controls">
        <Button onClick={() => dispatch(resetSelection())}>Clear selection</Button>
      </ButtonGroup>
      <Box py={2}>
        <Card>
          <CardContent>
            <pre style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
              <code>{regex}</code>
            </pre>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export const ManageIcons = () => {
  const dispatch = useAppDispatch();
  return (
    <Container maxWidth="xl">
      <Box style={{ height: '100vh' }} pt={1}>
        <Box>
          <Button
            variant="text"
            color="default"
            startIcon={<ArrowBack />}
            onClick={() => dispatch(replace('/'))}
          >
            back
          </Button>
          <Typography variant="h1" color="initial">
            Managge icons
          </Typography>
        </Box>
        <Controls />
        {allIcons.map(([name, Icon]) => (
          <IconBtn key={name} Icon={Icon} name={name} />
        ))}
      </Box>
    </Container>
  );
};
