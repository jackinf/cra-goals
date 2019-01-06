const host =   console.log(process.env.REACT_APP_BACKEND_HOST);

export async function login(username, password) {
  const response = await fetch(`${host}/v1/auth`, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json'}
  });

  // on success: {token: "abc..."}
  // on failure: {error_code: "UNAUTHORIZED", message: "Authentication failed.", developer_message: "Authentication failed: invalid credential"}
  return await response.json();
}

export function logout() {
  localStorage.removeItem("token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("token")
}
