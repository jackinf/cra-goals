import React, {useEffect} from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import goalsListData from "./GoalList.data";
import styles from "./GoalList.styles";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import LinearProgress from '@material-ui/core/LinearProgress';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1,
  },
});

const ITEM_HEIGHT = 48;

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const GoalList = (props) => {
  const {
    // variables
    paginatedList,
    actionMenuEl,
    loading,

    // actions
    fetchGoals,
    viewItem,
    editItem,
    handleOpenMenu,
    handleCloseMenu,
    isDeletePending,
    startDelete,
    cancelDelete,
    confirmDelete
  } = new goalsListData(props);
  useEffect(async () => await fetchGoals(), []);

  const classes = props.classes;

  return (
    <Paper className={`${classes.paper} ${classes.centralizer}`}>
      {loading && <LinearProgress className={classes.loader} />}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Due</TableCell>
            <TableCell align="right"/>
          </TableRow>
        </TableHead>
        {paginatedList && paginatedList.items &&
          <>
            <TableBody>
              {paginatedList.items.map(row => {
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  colSpan={3}
                  count={paginatedList.total_count}
                  rowsPerPage={paginatedList.per_page}
                  page={paginatedList.page-1}
                  SelectProps={{native: true}}
                  onChangePage={(event, page) => fetchGoals(page + 1, paginatedList.per_page)}
                  onChangeRowsPerPage={(event) => fetchGoals(paginatedList.page, parseInt(event.target.value))}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </>
        }
      </Table>

      <Dialog
        open={isDeletePending()}
        onClose={cancelDelete}
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
          <Button onClick={cancelDelete} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>

    </Paper>
  )
};

GoalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(GoalList));
