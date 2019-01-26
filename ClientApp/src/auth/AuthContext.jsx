import React, { useState, useEffect } from "react";
import {isLoggedIn, loginUsingFirebase, logoutUsingFirebase, googleAuthLogin} from "./Auth.api";
import {NotificationManager, sleep} from "../common/common-helpers";

const { Provider, Consumer } = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const setLoadingWrapper = () => new Promise((resolve) => {
    setLoading(true);
    resolve();
  })
    .finally(() => setLoading(false));

  useEffect(async () => {
    setLoggedIn(await isLoggedIn());
    setLoading(false);
  }, []);

  const handleLoginUsingFirebase = async (username, password) =>
    await setLoadingWrapper()
      .then(async () => await loginUsingFirebase(username, password))
      // this is a hack because firebase can issue a token which is not valid during some initial period
      .then(async () => await sleep(500).then(() => window.location.reload(true)))
      // .then(() => setLoggedIn(true))
      .catch((err) => NotificationManager.showError('Login failed', err));

  const handleLogoutUsingFirebase = async () =>
    await setLoadingWrapper()
      .then(async () => await logoutUsingFirebase())
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
      {loading && <div>Loading...</div>}
      {props.children}
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer };
