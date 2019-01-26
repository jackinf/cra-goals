import {getToken, logoutUsingFirebase} from "../auth/Auth.api";

function TokenException(message) {
  this.message = message;
  this.name = 'TokenException';
}

function UrlException(message) {
  this.message = message;
  this.name = 'UrlException';
}

export async function securedFetch(config) {
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

  return await fetch(url, fetchSettingsInner)
    .then(response => getJsonOrFail(response, onFailure));
}

async function getJsonOrFail(resp, onFailure) {
  if (resp && resp.ok === false) {
    switch (resp.status) {
      // case 401:
      //   await logoutUsingFirebase();
      //   window.location.reload(true);
      //   break;
      default:
        typeof onFailure === "function" && onFailure(resp.status);
    }
  } else {
    return resp.json();
  }
}
