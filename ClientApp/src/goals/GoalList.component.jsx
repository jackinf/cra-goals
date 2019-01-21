import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {getGoals, deleteGoal} from './Goal.api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Notification } from "../common/common-helpers";

const ITEM_HEIGHT = 48;

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 24,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing.unit}px auto`,
      width: '500px'
    },
  },
  addButton: {
    margin: `${theme.spacing.unit * 1}px`
  },
  centralizer: {
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing.unit}px auto`,
      width: '500px'
    }
  }
});

const GoalList = (props) => {
  const classes = props.classes;
  const [paginatedList, setPaginatedList] = useState({});
  const [actionMenuEl, setActionMenuEl] = useState(null);
  const [deletePendingItemId, setDeletePendingItemId] = useState(-1);
  useEffect(async () => setPaginatedList(await getGoals()), []);

  const viewItem = (id) => props.history.push(`/goals/${id}`);
  const editItem = (id) => props.history.push(`/goals/${id}/edit`);
  const startDelete = (id) => {
    handleCloseMenu();
    setDeletePendingItemId(id);
  };
  const confirmDelete = async () => {
    const id = deletePendingItemId;
    setDeletePendingItemId(-1);
    await deleteGoal(id);
    Notification.showSuccess("Successfully deleted");
    setPaginatedList(await getGoals());
  };
  const handleOpenMenu = event => setActionMenuEl(event.currentTarget);
  const handleCloseMenu = () => setActionMenuEl(null);

  return (
    <Paper className={`${classes.paper} ${classes.centralizer}`}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Due</TableCell>
            <TableCell align="right"/>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedList &&
          paginatedList.items &&
          paginatedList.items.map(row => {
            const menuButtonId = `menu-button-${row.id}`;
            const open = Boolean(actionMenuEl && actionMenuEl.id === menuButtonId);

            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.due && moment(row.due).format("DD.MM.YYYY")}</TableCell>
                <TableCell align="right">
                  <IconButton
                    id={menuButtonId}
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                  >
                    <MoreVertIcon/>
                  </IconButton>
                  <Menu
                    id={menuButtonId}
                    anchorEl={actionMenuEl}
                    open={open}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                      },
                    }}
                  >
                    <MenuItem onClick={() => viewItem(row.id)}>
                      <ViewIcon className={classes.icon}/>
                      View
                    </MenuItem>
                    <MenuItem onClick={() => editItem(row.id)}>
                      <EditIcon className={classes.icon}/>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => startDelete(row.id)}>
                      <DeleteIcon className={classes.icon}/>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog
        open={deletePendingItemId > -1}
        onClose={() => setDeletePendingItemId(-1)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you'd liked to delete the item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePendingItemId(-1)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => confirmDelete(true)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </Paper>
  )
};

GoalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(GoalList));
