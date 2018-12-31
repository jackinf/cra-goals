import React, {Component} from 'react';
import {getGoals} from './Goal.api';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {paginatedList: {}};
  }

  async componentDidMount() {
    const paginatedList = await getGoals();
    this.setState({paginatedList});
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <h2>Goals</h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.paginatedList &&
            this.state.paginatedList.items &&
            this.state.paginatedList.items.map(row => {
              return (
                <TableRow key={row.id} onClick={e => {
                  this.props.history.push('/goals/' + row.id);
                }}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.due}</TableCell>
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
