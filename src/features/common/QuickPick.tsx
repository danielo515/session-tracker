import React, { MouseEventHandler, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import selectSessionNames from './redux/selectSessionNames';
import { startSession } from '../home/redux/actions';
import { Card, Grid, Typography, CardContent, ButtonBase, Container } from '@mui/material';
import { fetchAllDefinitions } from 'features/session-definition/redux/actions';
import * as Icons from '@common/Icon/Icon';
import { useLongPress } from 'hooks/useLongPress';
import useAppSelector from 'hooks/useSelector';
import { push } from '@lagunovsky/redux-react-router';

const StyledContainer = styled(Card)(({ color, theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  borderColor: color || theme.palette.divider,
  position: 'relative',
  overflow: 'visible',
}));

const WidthButton = styled(ButtonBase)(() => ({
  width: '100%',
}));

const IconWrapper = styled('div')(({ color, theme }) => ({
  position: 'absolute',
  top: '3px',
  left: '3px',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '50%',
  height: '30px',
  width: '30px',
  border: `1px solid ${color || theme.palette.divider}`,
}));

function ButtonCard({
  onClick,
  children,
  id,
  color,
  iconName,
  onLongPress,
}: {
  color: string;
  iconName: string;
  id: string;
  children: import('react').ReactNode;
  onClick: MouseEventHandler<any>;
  onLongPress: () => unknown;
}) {
  const Icon = Icons[iconName] || Icons.Default;
  const longProps = useLongPress(onLongPress);
  return (
    <StyledContainer variant="outlined">
      <IconWrapper color={color}>
        <Icon color={color} />
      </IconWrapper>
      <WidthButton {...longProps} onClick={onClick} data-session={id}>
        <CardContent>
          <Typography>{children}</Typography>
        </CardContent>
      </WidthButton>
    </StyledContainer>
  );
}

export const QuickPick = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDefinitions());
  }, []);
  const { sessionNames: sessions, definitions } = useAppSelector((state) => ({
    sessionNames: selectSessionNames(state),
    definitions: state.sessionDefinition.byName,
  }));

  const startSessionOnClick = (e) => {
    const name = e.currentTarget.dataset.session;
    dispatch(
      startSession({
        name,
      }),
    );
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        {sessions.map((session) => {
          const definition = definitions[session] || {};
          return (
            <Grid item xs={4} sm={3} key={session}>
              <ButtonCard
                id={session}
                onClick={startSessionOnClick}
                color={definition.color}
                iconName={definition.icon}
                onLongPress={() => dispatch(push(`/session-definitions/update/${session}`))}
              >
                {session}
              </ButtonCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default QuickPick;
