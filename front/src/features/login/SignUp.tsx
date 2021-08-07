import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import isValidEmail from '../../common/isValidEmail'
import isValidPassword from '../../common/isValidPassword'
import { Copyright } from '../common/Copyright';
import { useLoginForm } from './useLoginForm';

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

const isValidName = (name: any) => typeof name === 'string' && name.length > 3

export default function SignUp({
  signUp
}: any) {
  const classes = useStyles();
  const { email, setEmail, password, setPassword, verificationPassword, setVerificationPassword, name, setName } = useLoginForm({ isSignUp: true });
  const handleSubmit = () => signUp({ email, password, name })
  const canSubmit = isValidEmail(email)
    && isValidPassword(password)
    && password === verificationPassword
    && isValidName(name)

  return (
    <Container component="main" maxWidth="xs">
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
            helperText='Min length 3 characters'
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
              <Link to='/not-implemented' variant="body2" component={RouterLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/login' variant="body2" component={RouterLink}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}