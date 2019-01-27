import React, { useState, useEffect } from "react";
import {isLoggedIn, login, logout, googleAuthLogin} from "./Auth.api";
import NotificationManager from "../utils/notificationManager";
import LinearProgress from '@material-ui/core/LinearProgress';

const { Provider, Consumer } = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const setLoadingWrapper = () => new Promise((resolve) => {
    setLoading(true);
    resolve();
  })
    .finally(() => setLoading(false));

  useEffect(async () => {
    setLoggedIn(await isLoggedIn());
    setLoading(false);
    setInitializing(false);
  }, []);

  const handleLoginUsingFirebase = async (username, password) =>
    await setLoadingWrapper()
      .then(async () => await login(username, password))
      // this is a hack because firebase can issue a token which is not valid during some initial period
      // .then(async () => await sleep(500).then(() => window.location.reload(true)))
      .then(() => setLoggedIn(true))
      .catch((err) => NotificationManager.showError('Login failed', err));

  const handleLogoutUsingFirebase = async () =>
    await setLoadingWrapper()
      .then(async () => await logout())
      .then(() => setLoggedIn(false))
      .catch((err) => NotificationManager.showError('Logout failed', err));

  const loginUsingGoogleAuth = async () =>
    await setLoadingWrapper()
      .then(async () => await googleAuthLogin())
      .then(() => setLoggedIn(true))
      .catch((err) => NotificationManager.showError('Login failed', err));

  return (
    <Provider value={{
      loggedIn,
      login: handleLoginUsingFirebase,
      logout: handleLogoutUsingFirebase,
      loginUsingGoogleAuth,
      loading
    }}>
      {loading && <LinearProgress style={{width: '100%'}} />}
      {!initializing && props.children}
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer };
