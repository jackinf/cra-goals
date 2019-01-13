import firebase from "firebase";

export async function loginUsingFirebase(username, password) {
  await firebase.auth().signInWithEmailAndPassword(username, password);
  const token = await firebase.auth().currentUser.getIdToken(true);
  localStorage.setItem("token", token);
}

export async function logoutUsingFirebase() {
  if (firebase.auth().currentUser) {
    await firebase.auth().signOut();
    localStorage.removeItem("token");
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem("token")
}
