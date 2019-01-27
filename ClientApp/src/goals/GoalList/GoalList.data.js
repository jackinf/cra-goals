import {useState} from "react";
import {deleteGoal, getGoals} from "../Goal.api";
import NotificationManager from "../../utils/notificationManager";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 25;
export default function GoalsListData(props) {
  const [loading, setLoading] = useState(false);
  const [paginatedList, setPaginatedList] = useState({});
  const [actionMenuEl, setActionMenuEl] = useState(null);
  const [deletePendingItemId, setDeletePendingItemId] = useState(-1);

  // Publicly available instances
  this.paginatedList = paginatedList;
  this.actionMenuEl = actionMenuEl;
  this.loading = loading;

  this.fetchGoals = async (page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE) => {
    try {
      setLoading(true);
      setPaginatedList(await getGoals(page, perPage))
    } finally {
      setLoading(false);
    }
  };
  this.handleOpenMenu = event => setActionMenuEl(event.currentTarget);
  this.handleCloseMenu = () => setActionMenuEl(null);
  this.isDeletePending = () => deletePendingItemId > -1;
  this.startDelete = (id) => {
    this.handleCloseMenu();
    setDeletePendingItemId(id);
  };
  this.cancelDelete = () => setDeletePendingItemId(-1);
  this.confirmDelete = async () => {
    try {
      setLoading(true);

      const id = deletePendingItemId;
      setDeletePendingItemId(-1);
      await deleteGoal(id);
      NotificationManager.showSuccess("Successfully deleted");
      await this.fetchGoals();
    } finally {
      setLoading(false);
    }
  };

  this.viewItem = (id) => props.history.push(`/goals/${id}`);
  this.editItem = (id) => props.history.push(`/goals/${id}/edit`);
}
