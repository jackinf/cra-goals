import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {getGoal} from "./Goal.api";
import {withRouter} from 'react-router-dom';
import ArrowBack from "../../node_modules/@material-ui/icons/ArrowBack";
import EditIcon from "../../node_modules/@material-ui/icons/Edit";

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
  },
  actionButton: {
    margin: theme.spacing.unit,
  }
});

function Goal(props) {
  const [goal, setGoal] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const goal = await getGoal(props.match.params.id);
    setGoal({...goal});
    setLoading(false);
  }, []);

  if (loading)
    return <div>"Loading..."</div>;

  const classes = props.classes;
  const {title, description, due, motivation} = goal;

  return (
    <div className={classes.root}>
      <Button className={classes.actionButton} variant="fab" color="primary" onClick={() => props.history.push(`/goals`)}>
        <ArrowBack className={classes.icon} />
      </Button>
      <Button className={classes.actionButton} variant="fab" color="primary" onClick={() => props.history.push(`/goals/${props.match.params.id}/edit`)}>
        <EditIcon className={classes.icon} />
      </Button>
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

Goal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Goal));
