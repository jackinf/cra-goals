import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import {getGoal} from "./Goal.api";
import {withRouter} from 'react-router-dom';
import ArrowBack from "../../node_modules/@material-ui/icons/ArrowBack";
import EditIcon from "../../node_modules/@material-ui/icons/Edit";
import goalCommonStyles from "./Goal.common-styles";
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  ...goalCommonStyles(theme),
  root: {
    flexGrow: 1
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
  },
  separator: {
    color: '#dcdcdc',
    backgroundColor: '#dcdcdc',
    height: '1px',
    border: 'none'
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
    <div className={`${classes.root} ${classes.centralizer}`}>
      <Fab className={classes.actionButton} color="primary" onClick={() => props.history.push(`/goals`)}>
        <ArrowBack className={classes.icon} />
      </Fab>
      <Fab className={classes.actionButton} color="primary" onClick={() => props.history.push(`/goals/${props.match.params.id}/edit`)}>
        <EditIcon className={classes.icon} />
      </Fab>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper>
            <div className={`${classes.paper} ${classes.paperTitle}`}>Title</div>
            <hr className={classes.separator}/>
            <div className={classes.paper}>{title}</div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div className={`${classes.paper} ${classes.paperTitle}`}>Description</div>
            <hr className={classes.separator}/>
            <div className={classes.paper}>{description}</div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div className={`${classes.paper} ${classes.paperTitle}`}>Due</div>
            <hr className={classes.separator}/>
            <div className={classes.paper}>{due && moment(due).format("DD.MM.YYYY")}</div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div className={`${classes.paper} ${classes.paperTitle}`}>Motivation</div>
            <hr className={classes.separator}/>
            <div className={classes.paper}>{motivation}</div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Goal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Goal));
