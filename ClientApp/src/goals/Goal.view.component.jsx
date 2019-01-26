import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import {deleteGoal, getGoal} from "./Goal.api";
import {withRouter} from 'react-router-dom';
import ArrowBack from "../../node_modules/@material-ui/icons/ArrowBack";
import EditIcon from "../../node_modules/@material-ui/icons/Edit";
import DeleteIcon from "../../node_modules/@material-ui/icons/Delete";
import goalCommonStyles from "./Goal.common-styles";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  const [deletePendingItemId, setDeletePendingItemId] = useState(-1);

  useEffect(async () => {
    const goal = await getGoal(props.match.params.id);
    setGoal({...goal});
    setLoading(false);
  }, []);
  const classes = props.classes;

  if (loading)
    return <LinearProgress className={classes.loader} />;

  const {title, description, due, motivation} = goal;
  const confirmDelete = async () => {
    await deleteGoal(deletePendingItemId);
    props.history.push(`/goals`);
  };

  return (
    <div className={`${classes.root} ${classes.centralizer}`}>
      <Fab className={classes.actionButton} color="default" onClick={() => props.history.push(`/goals`)}>
        <ArrowBack className={classes.icon} />
      </Fab>
      <Fab className={classes.actionButton} color="primary" onClick={() => props.history.push(`/goals/${props.match.params.id}/edit`)}>
        <EditIcon className={classes.icon} />
      </Fab>
      <Fab className={classes.actionButton} color="secondary" onClick={() => setDeletePendingItemId(props.match.params.id)}>
        <DeleteIcon className={classes.icon} />
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

      <Dialog
        open={deletePendingItemId > -1}
        onClose={() => setDeletePendingItemId(-1)}
        aria-labelledby="alert-dialog-title-1"
        aria-describedby="alert-dialog-description-1"
      >
        <DialogTitle id="alert-dialog-title-1">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-1">
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
    </div>
  );
}

Goal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Goal));
