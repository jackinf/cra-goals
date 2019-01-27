import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import LinearProgress from '@material-ui/core/LinearProgress';

export let backendUrl;

function Initialization(props) {
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let firebaseConfig = {};
    try {
      const response = await fetch("/api/home/configuration");
      const config = await response.json();
      backendUrl = config.goalsBackenUrl;
      firebaseConfig = config.firebase || {};
    } catch {
      console.error(`Failed to get from local server. Reverting to .env variables: ${process.env.REACT_APP_BACKEND_HOST}`);
      backendUrl = process.env.REACT_APP_BACKEND_HOST;
    }
    firebase.initializeApp({
      apiKey: firebaseConfig.apiKey || process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: firebaseConfig.authDomain || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: firebaseConfig.databaseURL || process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: firebaseConfig.projectId || process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: firebaseConfig.storageBucket || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: firebaseConfig.messagingSenderId || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
    });

    setLoading(false);
  }, []);

  return loading
    ? <LinearProgress style={{width: '100%'}} />
    : props.children
}

export default Initialization;
