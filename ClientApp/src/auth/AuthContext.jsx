import React, { useState, useEffect } from "react";
import {isLoggedIn, login, logout} from "./Auth.api";

const { Provider, Consumer } = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setInitialized(true);
  }, []);

  const handleLogin = async (username, password) => {
    const response = await login(username, password);
    if (response.token) {
      localStorage.setItem("token", response.token);
      setLoggedIn(true);
    } else {
      console.error(response.error_code, response.message);
      console.debug(response.developer_message);
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <Provider value={{
      loggedIn,
      login: handleLogin,
      logout: handleLogout,
      initialized
    }}>
      {props.children}
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer };
