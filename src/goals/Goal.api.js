import { securedFetch } from '../common/api-helpers';

export async function getGoals() {
  return await securedFetch({
    url: "http://localhost:8080/v1/goals",
    errorMessage: "Failed to fetch goals"
  });
}

export async function getGoal(id) {
  return await securedFetch({
    url: `http://localhost:8080/v1/goals/${id}`,
    errorMessage: `Failed to fetch goal with id ${id}`
  });
}

export async function addGoal(goal) {
  return await securedFetch({
    method: 'POST',
    body: JSON.stringify(goal),
    url: 'http://localhost:8080/v1/goals',
    errorMessage: `Failed to add goal`
  });
}

export async function updateGoal(id, goal) {
  return await securedFetch({
    method: 'PUT',
    body: JSON.stringify(goal),
    url: `http://localhost:8080/v1/goals/${id}`,
    errorMessage: `Failed to update goal with id ${id}`
  });
}

export async function deleteGoal(id) {
  return await securedFetch({
    method: 'DELETE',
    url: `http://localhost:8080/v1/goals/${id}`,
    errorMessage: `Failed to delete goal with id ${id}`
  });
}
