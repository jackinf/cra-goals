import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
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
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import {getGoals, deleteGoal} from './Goal.api';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 24,
  },
});

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {paginatedList: {}, actionMenuEl: null};
  }

  async componentDidMount() {
    const paginatedList = await getGoals();
    this.setState({paginatedList});
  }

  handleOpenMenu = event => {
    this.setState({ actionMenuEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ actionMenuEl: null });
  };

  viewItem = (id) => {
    this.props.history.push(`/goals/${id}`);
  };

  addItem = () => {
    this.props.history.push(`/goals/new`);
  };

  deleteItem = async (id) => {
    console.info(`deleting with id ${id}`);
    // TODO: add dialog
    await deleteGoal(id);
  };

  render() {
    const actionMenuEl = this.state.actionMenuEl;
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography component="h2" variant="h5">
          Goals
        </Typography>
        <div>
          <Button variant="contained" color="primary" onClick={() => this.addItem()}>
            <AddIcon className={classes.icon} /> Add new goal
          </Button>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Due</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.paginatedList &&
            this.state.paginatedList.items &&
            this.state.paginatedList.items.map(row => {
              const open = Boolean(actionMenuEl);

              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{moment(row.due).format("MMM Do YY")}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="More"
                      aria-owns={open ? 'long-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleOpenMenu}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={actionMenuEl}
                      open={open}
                      onClose={this.handleCloseMenu}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: 200,
                        },
                      }}
                    >
                      <MenuItem onClick={() => this.viewItem(row.id)}>
                        <ViewIcon className={classes.icon} />
                        View
                      </MenuItem>
                      <MenuItem onClick={this.handleCloseMenu}>
                        <EditIcon className={classes.icon} />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => this.deleteItem(row.id)}>
                        <DeleteIcon className={classes.icon} />
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

GoalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(GoalList));
