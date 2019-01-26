import firebase from "firebase/app";
import 'firebase/auth';
import {sleep} from "../common/common-helpers";
import jwtDecode from 'jwt-decode';
import moment from "moment";

export async function loginUsingFirebase(username, password) {
  await firebase.auth().signInWithEmailAndPassword(username, password);
}

export async function logoutUsingFirebase() {
  if (firebase.auth().currentUser) {
    await firebase.auth().signOut();
  }
}

export async function isLoggedIn() {
  return !!(await getCurrentFirebaseUserWithRetries(3, () => 500));
}

export async function getToken() {
  const currentUser = await getCurrentFirebaseUserWithRetries();
  if (!currentUser) {
    return undefined;
  }
  let token = await currentUser.getIdToken();
  if (!token) {
    return undefined;
  }
  token = refreshIfNeeded(token);
  return token;
}

export async function googleAuthLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithRedirect(provider);
}

async function getCurrentFirebaseUserWithRetries(tries = 5, timeout = i => i * 500) {
  for (let i = 1; i <= tries; i++) {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.info(`trying to get currentUser, attempts left ${tries-i}`);
      await sleep(timeout(i));
    } else {
      return currentUser;
    }
  }
}

async function refreshIfNeeded(token) {
  const expirationDate = moment(jwtDecode(token).exp * 1000).toDate();
  const now = new Date();

  let now2 = new Date();
  now2.setMinutes(now2.getMinutes() + 10);

  if (expirationDate < now) { // expired
    console.info('token expired');
  } else if (expirationDate > now && expirationDate < now2) {
    console.info('token will soon expire. Refreshing');
    await firebase.auth().currentUser.getIdToken(true);
  }
  return token;
}
