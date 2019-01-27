import firebase from "firebase/app";
import 'firebase/auth';

export default class FirebaseManager {
  static async signInWithEmailAndPassword(username, password) {
    await firebase.auth().signInWithEmailAndPassword(username, password);
    return await FirebaseManager.getRefreshedToken();
  }

   static async signOut() {
     if (firebase.auth().currentUser) {
       await firebase.auth().signOut();
     }
   }

   static async signInUsingGoogleAuth() {
     const provider = new firebase.auth.GoogleAuthProvider();
     await firebase.auth().signInWithPopup(provider);
     return await FirebaseManager.getRefreshedToken();
   }

   static async getRefreshedToken() {
      return await firebase.auth().currentUser.getIdToken(true);
   }
}
