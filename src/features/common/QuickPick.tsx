import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { startSession } from '../home/redux/actions';
import { Card, Grid, Typography, CardContent, ButtonBase, Container } from '@mui/material';
import { fetchAllDefinitions } from 'features/session-definition/redux/actions';
import { Icons } from '@common/Icon/Icon';
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

// const icons: Record<string, ((props: any) => JSX.Element) | undefined> = Icons;

function ButtonCard({
  onClick,
  children,
  id,
  color,
  iconName,
  onLongPress,
}: {
  color: string;
  iconName: keyof typeof Icons;
  id: string;
  children: import('react').ReactNode;
  onClick: () => void;
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
  const { definitions } = useAppSelector((state) => ({
    definitions: state.sessionDefinition.all,
  }));

  const startSessionOnClick = (name: string) => {
    dispatch(
      startSession({
        name,
      }),
    );
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        {definitions.map((definition) => {
          return (
            <Grid item xs={4} sm={3} key={definition.id}>
              <ButtonCard
                id={definition.id}
                onClick={() => startSessionOnClick(definition.name)}
                color={definition.color}
                iconName={definition.icon as keyof typeof Icons}
                onLongPress={() => dispatch(push(`/session-definitions/update/${definition.name}`))}
              >
                {definition.name}
              </ButtonCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default QuickPick;
