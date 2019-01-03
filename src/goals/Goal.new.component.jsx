import React, {useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom';
import {addGoal} from "./Goal.api";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function GoalNew(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [motivation, setMotivation] = useState('');

  const {classes} = props;
  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create a goal
      </Typography>
      <form className={classes.form} onSubmit={async e => {
        e.preventDefault();
        await addGoal({title, description, due, motivation});
        props.history.push('/goals');
      }}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input id="title" name="title" autoComplete="title" autoFocus
                 defaultValue={title}
                 onChange={e => setTitle(e.target.value)}/>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input name="description" type="description" id="description"
                 defaultValue={description}
                 onChange={e => setDescription(e.target.value)}/>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="due">Due</InputLabel>
          <Input name="due" type="due" id="due"
                 defaultValue={due}
                 onChange={e => setDue(e.target.value)}/>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="motivation">Motivation</InputLabel>
          <Input name="motivation" type="motivation" id="motivation"
                 defaultValue={motivation}
                 onChange={e => setMotivation(e.target.value)}/>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add goal
        </Button>
      </form>
    </Paper>
  );

}

export default withStyles(styles)(withRouter(GoalNew));
