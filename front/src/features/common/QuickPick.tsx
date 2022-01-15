import React, { MouseEventHandler, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import selectSessionNames from './redux/selectSessionNames';
import { startSession } from '../home/redux/actions';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  ButtonBase,
  makeStyles,
  Container,
} from '@material-ui/core';
import { fetchAllDefinitions } from 'features/session-definition/redux/actions';
import * as Icons from '@common/Icon/Icon';
import { useLongPress } from 'hooks/useLongPress';
import { RouteComponentProps, withRouter } from 'react-router';
import useAppSelector from 'hooks/useSelector';

const useStyle = makeStyles(theme => ({
  Button: {
    width: '100%',
  },
  Card: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderColor: ({ color }: { color: string }) => color || theme.palette.divider,
    position: 'relative',
    overflow: 'visible',
  },
  Icon: {
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
    border: ({ color }: { color: string }) => `1px solid ${color || theme.palette.divider}`,
  },
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
  onLongPress: () => any;
}) {
  const style = useStyle({ color });
  const Icon = Icons[iconName] || Icons.Default;
  const longProps = useLongPress(onLongPress);
  return (
    <Card variant="outlined" className={style.Card}>
      <div className={style.Icon}>
        <Icon color={color} />
      </div>
      <ButtonBase {...longProps} className={style.Button} onClick={onClick} data-session={id}>
        <CardContent>
          <Typography>{children}</Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}

interface QuickPickProps {
  history: RouteComponentProps['history'];
}

export const QuickPick = (props: QuickPickProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDefinitions());
  }, []);
  const { history } = props;
  const { sessionNames: sessions, definitions } = useAppSelector(state => ({
    sessionNames: selectSessionNames(state),
    definitions: state.sessionDefinition.byName,
  }));

  const startSessionOnClick = e => {
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
        {sessions.map(session => {
          const definition = definitions[session] || {};
          return (
            <Grid item xs={4} sm={3} key={session}>
              <ButtonCard
                id={session}
                onClick={startSessionOnClick}
                color={definition.color}
                iconName={definition.icon}
                onLongPress={() => history.push(`/session-definitions/update/${session}`)}
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

export default withRouter(QuickPick);
