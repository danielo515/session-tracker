import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import isValidEmail from '../../common/isValidEmail';
import isValidPassword from '../../common/isValidPassword';
import { useLoginForm } from './useLoginForm';
import { FooterWithVersion } from '../common/index';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  login: Function;
  error: string;
};

export default function SignIn({ login, error }: Props) {
  const classes = useStyles();
  const { email, setEmail, password, setPassword } = useLoginForm();
  const [rememberMe, setRememberMe] = useState(false);
  /**
   * @param {Function} set
   * @returns {import('react').ChangeEventHandler<HTMLInputElement>}
   */
  const handleCheck = (set: Function) => ({ target }) => set(target.checked);
  /** @param {boolean} isGoogleLogin */
  const handleSubmit = (isGoogleLogin: boolean) =>
    login({ email, password, rememberMe, isGoogleLogin });
  const canSubmit = isValidEmail(email) && isValidPassword(password);
  return (
    <Container component="main" maxWidth="xs">
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
            onClick={handleSubmit}
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
    </Container>
  );
}
