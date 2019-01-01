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


