function TokenException(message) {
  this.message = message;
  this.name = 'TokenException';
}

export async function getGoals() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new TokenException("Token is missing");
  }

  try {
    const response = await fetch("http://localhost:8080/v1/goals", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch goals", err)
  }
}

export async function getGoal(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new TokenException("Token is missing");
  }

  try {
    const response = await fetch(`http://localhost:8080/v1/goals/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.error(`Failed to fetch goal with id ${id}`, err)
  }
}


