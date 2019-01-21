import React, { useState, useEffect } from "react";
import {isLoggedIn, loginUsingFirebase, logoutUsingFirebase, googleAuthLogin} from "./Auth.api";
import { Notification } from "../common/common-helpers";

const { Provider, Consumer } = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const setLoadingWrapper = () => new Promise((resolve) => {
    setLoading(true);
    resolve();
  })
    .finally(() => setLoading(false));

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setLoading(false);
  }, []);

  const handleLoginUsingFirebase = async (username, password) =>
    await setLoadingWrapper()
      .then(async () => await loginUsingFirebase(username, password))
      .then(() => setLoggedIn(true))
      .catch((err) => Notification.error('Login failed', err));

  const handleLogoutUsingFirebase = async () =>
    await setLoadingWrapper()
      .then(async () => await logoutUsingFirebase())
      .then(() => setLoggedIn(false))
      .catch((err) => Notification.error('Logout failed', err));

  const loginUsingGoogleAuth = async () =>
    await setLoadingWrapper()
      .then(async () => await googleAuthLogin())
      .then(() => setLoggedIn(true))
      .catch((err) => Notification.error('Login failed', err));

  return (
    <Provider value={{
      loggedIn,
      login: handleLoginUsingFirebase,
      logout: handleLogoutUsingFirebase,
      loginUsingGoogleAuth,
      loading
    }}>
      {loading && <div>Loading...</div>}
      {props.children}
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer };
