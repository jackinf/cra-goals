import {useState} from "react";
import {deleteGoal, getGoals} from "../Goal.api";
import {NotificationManager} from "../../common/common-helpers";

export default function GoalsListData(props) {
  const [paginatedList, setPaginatedList] = useState({});
  const [actionMenuEl, setActionMenuEl] = useState(null);
  const [deletePendingItemId, setDeletePendingItemId] = useState(-1);

  // Publicly available instances
  this.paginatedList = paginatedList;
  this.actionMenuEl = actionMenuEl;

  this.fetchGoals = async () => setPaginatedList(await getGoals());
  this.handleOpenMenu = event => setActionMenuEl(event.currentTarget);
  this.handleCloseMenu = () => setActionMenuEl(null);
  this.isDeletePending = () => deletePendingItemId > -1;
  this.startDelete = (id) => {
    this.handleCloseMenu();
    setDeletePendingItemId(id);
  };
  this.cancelDelete = () => setDeletePendingItemId(-1);
  this.confirmDelete = async () => {
    const id = deletePendingItemId;
    setDeletePendingItemId(-1);
    await deleteGoal(id);
    NotificationManager.showSuccess("Successfully deleted");
    await this.fetchGoals();
  };

  this.viewItem = (id) => props.history.push(`/goals/${id}`);
  this.editItem = (id) => props.history.push(`/goals/${id}/edit`);
}
