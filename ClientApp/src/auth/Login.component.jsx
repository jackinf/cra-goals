import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {AuthConsumer} from './AuthContext';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing.unit * 8}px 0 0 0`,
      border: 'none'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 8,
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class SignIn extends Component {
  render() {
    const {classes} = this.props;

    return (
      <AuthConsumer>
        {({loggedIn, login, logout, loginUsingGoogleAuth}) => {
          if (loggedIn) {
            return (
              <div>
                You are logged in.
                <Button variant="contained" color="primary" onClick={logout}>
                  Log out
                </Button>
              </div>
            );
          }

          return (
            <main className={classes.main}>
              <CssBaseline/>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} onSubmit={async e => {
                  e.preventDefault();
                  await login(this.state.username, this.state.password);
                }}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" autoFocus
                           onChange={e => this.setState({username: e.target.value})}/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password"
                           onChange={e => this.setState({password: e.target.value})}/>
                  </FormControl>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={async () => await login(this.state.username, this.state.password)}
                  >
                    Sign in
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={async () => await loginUsingGoogleAuth()}
                  >
                    Sign in Using Google OAuth
                  </Button>
                </form>
              </Paper>
            </main>
          );

        }}
      </AuthConsumer>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
