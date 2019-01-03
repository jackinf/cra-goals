import React, {Component} from 'react';
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


class GoalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
  }

  async componentDidMount() {
    const goal = await getGoal(this.props.match.params.id);
    this.setState({
      loading: false,
      title: goal.title,
      description: goal.description,
      due: goal.due,
      motivation: goal.motivation
    });
  }

  render() {
    const {classes} = this.props;

    if (this.state.loading)
      return <div>Loading...</div>;

    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update a goal
        </Typography>
        <form className={classes.form} onSubmit={async e => {
          e.preventDefault();
          await updateGoal(this.props.match.params.id, this.state);
          this.props.history.push('/goals');
        }}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" autoComplete="title" autoFocus
                   defaultValue={this.state.title}
                   onChange={e => this.setState({title: e.target.value})}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input name="description" type="description" id="description"
                   defaultValue={this.state.description}
                   onChange={e => this.setState({description: e.target.value})}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="due">Due</InputLabel>
            <Input name="due" type="due" id="due"
                   defaultValue={this.state.due}
                   onChange={e => this.setState({due: e.target.value})}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="motivation">Motivation</InputLabel>
            <Input name="motivation" type="motivation" id="motivation"
                   defaultValue={this.state.motivation}
                   onChange={e => this.setState({motivation: e.target.value})}/>
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
    );
  }
}

export default withStyles(styles)(withRouter(GoalEdit));