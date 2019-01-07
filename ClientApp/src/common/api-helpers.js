function TokenException(message) {
  this.message = message;
  this.name = 'TokenException';
}

function UrlException(message) {
  this.message = message;
  this.name = 'UrlException';
}

export async function securedFetch(config) {
  const {url, errorMessage, fetchSettings} = config;
  let fetchSettingsInner = fetchSettings || {};
  if (!url) {
    throw new UrlException("Url is missing");
  }
  const token = localStorage.getItem("token");
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

  try {
    const response = await fetch(url, fetchSettingsInner);
    return await response.json();
  } catch (err) {
    console.error(errorMessage || 'Error occurred', err)
  }
}
