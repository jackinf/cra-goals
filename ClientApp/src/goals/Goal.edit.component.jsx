import React, {useState, useEffect} from 'react';
import Avatar from "@material-ui/core/Avatar";
import EditIcon from '@material-ui/icons/Edit';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Label from "@material-ui/core/StepLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom';
import {updateGoal, getGoal} from "./Goal.api";
import ArrowBack from "../../node_modules/@material-ui/icons/ArrowBack";
import Visibility from "../../node_modules/@material-ui/icons/Visibility";
import goalCommonStyles from "./Goal.common-styles";
import { DatePicker } from 'material-ui-pickers';
import Fab from '@material-ui/core/Fab';
import {NotificationManager, ValidationManager} from "../helpers/common-helpers";
import FormHelperText from "./Goal.new.component";
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  ...goalCommonStyles(theme)
});

const defaultValidationDetails = {title: '', description: '', due: '', motivation: ''};
function GoalEdit(props) {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [motivation, setMotivation] = useState('');
  const [validationDetails, setValidationDetails] = useState(defaultValidationDetails);

  useEffect(async () => {
    const goal = await getGoal(props.match.params.id);
    setTitle(goal.title);
    setDescription(goal.description);
    setDue(goal.due);
    setMotivation(goal.motivation);
    setInitializing(false);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    let onFinally = () => {};
    try {
      setLoading(true);
      setValidationDetails(defaultValidationDetails);
      const response = await updateGoal(props.match.params.id, {title, description, due, motivation});
      if (ValidationManager.isSuccessfulResponse(response)) {
        NotificationManager.showSuccess("Successfully updated");
        NotificationManager.pushNotification("Successfully updated");
        onFinally = () => props.history.push('/goals');
      } else if (ValidationManager.isBadResponseWithDetails(response)) {
        setValidationDetails({...ValidationManager.convertValidationDetailsFromArrayToObject(response.details)});
      }
    } finally {
      setLoading(false);
      onFinally();
    }
  };

  const {classes} = props;

  if (initializing)
    return <LinearProgress className={classes.loader} />;

  return (
    <div>
      {loading && <LinearProgress className={classes.loader} />}
      <div className={classes.centralizer}>
        <Fab className={classes.backButton} color="default" onClick={() => props.history.push(`/goals`)}>
          <ArrowBack className={classes.icon} />
        </Fab>
        <Fab className={classes.backButton} color="primary" onClick={() => props.history.push(`/goals/${props.match.params.id}`)}>
          <Visibility className={classes.icon} />
        </Fab>
      </div>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Update a goal
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth error={!!validationDetails["title"]}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" autoComplete="title" autoFocus defaultValue={title} onChange={e => setTitle(e.target.value)} />
            {!!validationDetails["title"] && <FormHelperText id="component-error-text">{validationDetails["title"]}</FormHelperText>}
          </FormControl>
          <FormControl margin="normal" required fullWidth error={!!validationDetails["description"]}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input name="description" type="description" id="description" defaultValue={description} onChange={e => setDescription(e.target.value)} />
            {!!validationDetails["description"] && <FormHelperText id="component-error-text">{validationDetails["description"]}</FormHelperText>}
          </FormControl>
          <FormControl margin="normal" required fullWidth error={!!validationDetails["due"]}>
            <Label className={classes.dateLabel}>Due *</Label>
            <DatePicker value={due} onChange={setDue} format="DD.MM.YYYY" />
            {!!validationDetails["due"] && <FormHelperText id="component-error-text">{validationDetails["due"]}</FormHelperText>}
          </FormControl>
          <FormControl margin="normal" required fullWidth error={!!validationDetails["motivation"]}>
            <InputLabel htmlFor="motivation">Motivation</InputLabel>
            <Input name="motivation" type="motivation" id="motivation" defaultValue={motivation} onChange={e => setMotivation(e.target.value)} />
            {!!validationDetails["motivation"] && <FormHelperText id="component-error-text">{validationDetails["motivation"]}</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Update goal
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(withRouter(GoalEdit));
