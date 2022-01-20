import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import isValidEmail from '../../common/isValidEmail';
import isValidPassword from '../../common/isValidPassword';
import { Copyright } from '../common/Copyright';
import { useLoginForm } from './useLoginForm';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const PREFIX = 'SignUp';

const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  [`& .${classes.form}`]: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const isValidName = (name): name is string => typeof name === 'string' && name.length > 3;

type Props = {
  error: string | null;
  signUp: ({ email, password, name }: { email: string; password: string; name: string }) => void;
};

export default function SignUp({ signUp, error }: Props) {

  const {
    email,
    setEmail,
    password,
    setPassword,
    verificationPassword,
    setVerificationPassword,
    name,
    setName,
  } = useLoginForm({ isSignUp: true });
  const canSubmit =
    isValidEmail(email) &&
    isValidPassword(password) &&
    password === verificationPassword &&
    isValidName(name);
  const handleSubmit = () => canSubmit && signUp({ email, password, name });

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={setName}
            autoFocus
            helperText="Min length 3 characters"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="verifyPassword"
            label="Verify Password"
            id="verifyPassword"
            autoComplete="current-password"
            value={verificationPassword}
            onChange={setVerificationPassword}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/not-implemented" variant="body2" component={RouterLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2" component={RouterLink}>
                {'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </StyledContainer>
  );
}
