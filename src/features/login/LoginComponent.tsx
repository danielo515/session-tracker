import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import isValidEmail from '../../common/isValidEmail';
import isValidPassword from '../../common/isValidPassword';
import { useLoginForm } from './useLoginForm';
import { FooterWithVersion } from '../common/index';

const PREFIX = 'LoginComponent';

const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
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
  },
}));

type LoginArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
  isGoogleLogin: boolean;
};

type Props = {
  login({ email, password, rememberMe }: LoginArgs): void;
  error: string | null;
};

export default function SignIn({ login, error }: Props) {
  const { email, setEmail, password, setPassword } = useLoginForm();
  const [rememberMe, setRememberMe] = useState(false);
  const handleCheck =
    (set: (arg: boolean) => unknown) =>
    ({ target }) =>
      set(target.checked);
  const handleSubmit = (isGoogleLogin: boolean) =>
    login({ email, password, rememberMe, isGoogleLogin });
  const canSubmit = isValidEmail(email) && isValidPassword(password);
  return (
    <StyledContainer maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
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
            error={!!error}
            helperText={error}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                onChange={handleCheck(setRememberMe)}
              />
            }
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSubmit(false)}
            disabled={!canSubmit}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit.bind(null, true)}
          >
            Google Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/not-implemented" variant="body2" component={RouterLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2" component={RouterLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <FooterWithVersion />
      </Box>
    </StyledContainer>
  );
}
