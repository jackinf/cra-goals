import React, {Component} from 'react';
import {login, logout, isLoggedIn} from "./Auth.api";
import Button from '@material-ui/core/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: isLoggedIn()}
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          You are logged in.
          <Button variant="contained" color="primary" onClick={() => {
            logout();
            this.setState({loggedIn: false});
          }}>
            Log out
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="contained" color="primary" onClick={() => {
            login("demo", "pass");
            this.setState({loggedIn: true});
          }}>
            Log in
          </Button>
        </div>
      )
    }
  }
}

export default Login;
