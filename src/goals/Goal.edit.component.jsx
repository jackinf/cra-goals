import React, {useState, useEffect} from 'react';
import Avatar from "@material-ui/core/Avatar";
import EditIcon from '@material-ui/icons/Edit';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom';
import {updateGoal, getGoal} from "./Goal.api";
import ArrowBack from "../../node_modules/@material-ui/icons/ArrowBack";
import goalCommonStyles from "./Goal.common-styles";

const styles = theme => ({ ...goalCommonStyles(theme) });

function GoalEdit(props) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [motivation, setMotivation] = useState('');

  useEffect(async () => {
    const goal = await getGoal(props.match.params.id);
    setTitle(goal.title);
    setDescription(goal.description);
    setDue(goal.due);
    setMotivation(goal.motivation);
    setLoading(false);
  }, []);

  const {classes} = props;

  if (loading)
    return <div>Loading...</div>;

  return (
    <div>
      <Button className={classes.backButton} variant="fab" color="primary" onClick={() => props.history.push(`/goals`)}>
        <ArrowBack className={classes.icon} />
      </Button>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Update a goal
        </Typography>
        <form className={classes.form} onSubmit={async e => {
          e.preventDefault();
          await updateGoal(props.match.params.id, {title, description, due, motivation});
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
            Update goal
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(withRouter(GoalEdit));
