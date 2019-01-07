import { securedFetch } from '../common/api-helpers';
import {backendUrl as host} from "../common/Initialization.componennt";

export async function getGoals() {
  return await securedFetch({
    url: `${host}/v1/goals`,
    errorMessage: "Failed to fetch goals"
  });
}

export async function getGoal(id) {
  return await securedFetch({
    url: `${host}/v1/goals/${id}`,
    errorMessage: `Failed to fetch goal with id ${id}`
  });
}

export async function addGoal(goal) {
  return await securedFetch({
    url: `${host}/v1/goals`,
    fetchSettings: {
      method: 'POST',
      body: JSON.stringify(goal),
    },
    errorMessage: `Failed to add goal`
  });
}

export async function updateGoal(id, goal) {
  return await securedFetch({
    url: `${host}/v1/goals/${id}`,
    fetchSettings: {
      method: 'PUT',
      body: JSON.stringify(goal),
    },
    errorMessage: `Failed to update goal with id ${id}`
  });
}

export async function deleteGoal(id) {
  return await securedFetch({
    url: `${host}/v1/goals/${id}`,
    fetchSettings: { method: 'DELETE', },
    errorMessage: `Failed to delete goal with id ${id}`
  });
}
