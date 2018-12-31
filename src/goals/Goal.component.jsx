import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getGoal} from "./Goal.api";
import {withRouter} from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperTitle: {
    fontWeight: 800
  }
});

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {goal: undefined};
  }

  async componentDidMount() {
    const goal = await getGoal(this.props.match.params.id);
    this.setState({goal});
  }

  render() {
    if (!this.state.goal)
      return "Loading...";

    const classes = this.props.classes;
    const {title, description, due, motivation} = this.state.goal;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.paperTitle}`}>Title:</Paper>
            <Paper className={classes.paper}>{title}</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.paperTitle}`}>Description</Paper>
            <Paper className={classes.paper}>{description}</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.paperTitle}`}>Due</Paper>
            <Paper className={classes.paper}>{due}</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.paperTitle}`}>Motivation</Paper>
            <Paper className={classes.paper}>{motivation}</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Goal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Goal));
