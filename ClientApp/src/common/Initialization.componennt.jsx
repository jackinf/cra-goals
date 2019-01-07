import React, { useState, useEffect } from "react";

export let backendUrl;

function Initialization(props) {
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch("/api/home/configuration");
      const config = await response.json();
      console.log('config', config);
      backendUrl = config.goalsBackenUrl;
    } catch {
      console.error(`Failed to get from local server. Reverting to .env variables: ${process.env.REACT_APP_BACKEND_HOST}`);
      backendUrl = process.env.REACT_APP_BACKEND_HOST;
    }
    setLoading(false);
  }, []);

  return loading
    ? <div>Loading...</div>
    : props.children
}

export default Initialization;
