export async function login(username, password) {
  const response = await fetch("http://localhost:8080/v1/auth", {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json'}
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
  window.location.reload();
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export function isLoggedIn() {
  return !!localStorage.getItem("token")
}
