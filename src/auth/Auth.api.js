export async function login(username, password) {
  const response = await fetch("http://localhost:8080/v1/auth", {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json'}
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("token")
}
