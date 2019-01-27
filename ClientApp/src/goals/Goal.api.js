import { backendUrl as host } from "../common/Initialization.component";
import NotificationManager from "../utils/notificationManager";
import ApiManager from "../utils/apiManager";

export async function getGoals(page, perPage) {
  return await ApiManager.securedFetch({
    url: `${host}/v1/goals?page=${page}&per_page=${perPage}`,
    onFailure: () => NotificationManager.showError("Failed to fetch goals")
  });
}

export async function getGoal(id) {
  return await ApiManager.securedFetch({
    url: `${host}/v1/goals/${id}`,
    onFailure: () => NotificationManager.showError(`Failed to fetch goal with id ${id}`)
  });
}

export async function addGoal(goal) {
  return await ApiManager.securedFetch({
    url: `${host}/v1/goals`,
    fetchSettings: {
      method: 'POST',
      body: JSON.stringify(goal),
    },
    onFailure: () => NotificationManager.showError(`Failed to add goal`)
  });
}

export async function updateGoal(id, goal) {
  return await ApiManager.securedFetch({
    url: `${host}/v1/goals/${id}`,
    fetchSettings: {
      method: 'PUT',
      body: JSON.stringify(goal),
    },
    onFailure: () => NotificationManager.showError(`Failed to update goal with id ${id}`)
  });
}

export async function deleteGoal(id) {
  return await ApiManager.securedFetch({
    url: `${host}/v1/goals/${id}`,
    fetchSettings: { method: 'DELETE', },
    onFailure: () => NotificationManager.showError(`Failed to delete goal with id ${id}`)
  });
}
