import jwtDecode from 'jwt-decode';
import moment from "moment";
import FirebaseManager from "../utils/firebaseManager";

const TOKEN_KEY = "token";

export async function login(username, password) {
  localStorage.setItem(TOKEN_KEY, await FirebaseManager.signInWithEmailAndPassword(username, password));
}

export async function logout() {
  await FirebaseManager.signOut();
  localStorage.removeItem(TOKEN_KEY);
}

export async function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export async function getToken() {
  let token = localStorage.getItem(TOKEN_KEY);
  token = await refreshIfNeeded(token);
  return token;
}

export async function googleAuthLogin() {
  localStorage.setItem(TOKEN_KEY, await FirebaseManager.signInUsingGoogleAuth());
}

async function refreshIfNeeded(token) {
  const expirationDate = moment(jwtDecode(token).exp * 1000).toDate();
  const now = new Date();

  let now2 = new Date();
  now2.setMinutes(now2.getMinutes() + 10);

  if (expirationDate < now) { // expired
    console.info('token expired');
    await logout();
    window.location.reload(true);
  } else if (expirationDate > now && expirationDate < now2) {
    console.info('token will soon expire. Refreshing');
    localStorage.setItem(TOKEN_KEY, await FirebaseManager.getRefreshedToken());
  }
  return token;
}
