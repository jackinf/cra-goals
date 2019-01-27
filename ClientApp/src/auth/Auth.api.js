import firebase from "firebase/app";
import 'firebase/auth';
import jwtDecode from 'jwt-decode';
import moment from "moment";

const TOKEN_KEY = "token";

export async function loginUsingFirebase(username, password) {
  await firebase.auth().signInWithEmailAndPassword(username, password);
  const token = await firebase.auth().currentUser.getIdToken(true);
  localStorage.setItem(TOKEN_KEY, token);
}

export async function logoutUsingFirebase() {
  if (firebase.auth().currentUser) {
    await firebase.auth().signOut();
  }
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
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
  const token = await firebase.auth().currentUser.getIdToken(true);
  localStorage.setItem(TOKEN_KEY, token);
}

async function refreshIfNeeded(token) {
  const expirationDate = moment(jwtDecode(token).exp * 1000).toDate();
  const now = new Date();

  let now2 = new Date();
  now2.setMinutes(now2.getMinutes() + 10);

  if (expirationDate < now) { // expired
    console.info('token expired');
    await logoutUsingFirebase();
    window.location.reload(true);
  } else if (expirationDate > now && expirationDate < now2) {
    console.info('token will soon expire. Refreshing');
    await firebase.auth().currentUser.getIdToken(true);
  }
  return token;
}
