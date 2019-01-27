import {getToken, logoutUsingFirebase} from "../auth/Auth.api";
import {sleep} from "./commonHelpers";
import {TokenException, UrlException} from "./exceptions";

const MAX_RETRIES_FOR_LOGOUT = 3;

export default class ApiManager {
  static async securedFetch(config) {
    const {url, onFailure, fetchSettings} = config;
    let fetchSettingsInner = fetchSettings || {};
    if (!url) {
      throw new UrlException("Url is missing");
    }
    const token = await getToken();
    if (!token) {
      throw new TokenException("Token is missing");
    }

    fetchSettingsInner.headers = fetchSettingsInner.headers || {};
    if (!fetchSettingsInner.headers.hasOwnProperty('Authorization')) {
      fetchSettingsInner.headers['Authorization'] = `Bearer ${token}`
    }
    if (!fetchSettingsInner.headers.hasOwnProperty('Content-Type')) {
      fetchSettingsInner.headers['Content-Type'] = 'application/json'
    }

    return await doFetch(url, fetchSettingsInner, onFailure, MAX_RETRIES_FOR_LOGOUT);
  }
}

async function doFetch(url, fetchSettingsInner, onFailure, attemptsLeft = MAX_RETRIES_FOR_LOGOUT) {
  const resp = await fetch(url, fetchSettingsInner);
  if (resp && resp.ok === false) {
    switch (resp.status) {
      case 401:

        // this is a hack because firebase can issue a token which is not valid during some initial period
        if (attemptsLeft > -1) {
          console.info(`token verification failed, attempts left: ${attemptsLeft}`);
          await sleep(1000 * (MAX_RETRIES_FOR_LOGOUT - attemptsLeft));
          return await doFetch(url, fetchSettingsInner, onFailure, attemptsLeft-1);
        }

        await logoutUsingFirebase();
        window.location.reload(true);
        break;
      default:
        typeof onFailure === "function" && onFailure(resp.status);
        return null;
    }
  } else {
    return resp.json();
  }
}
