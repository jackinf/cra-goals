import React, {Component} from 'react';
import {login, logout, isLoggedIn} from "./Auth.api";

class Login extends Component {
  render() {
    if (isLoggedIn()) {
      return (
        <div>
          You are logged in. <button onClick={() => logout()}>Log out</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => login("demo", "pass")}>Log in</button>
        </div>
      )
    }
  }
}

export default Login;
