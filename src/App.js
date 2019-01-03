import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import './App.css';
import GoalList from "./goals/GoalList.component";
import GoalNew from "./goals/Goal.new.component";
import GoalEdit from "./goals/Goal.edit.component";
import Goal from "./goals/Goal.component";
import Login from "./auth/Login.component";

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/goals/new" exact component={GoalNew} />
            <Route path="/goals/:id/edit" exact component={GoalEdit} />
            <Route path="/goals/:id" exact component={Goal} />
            <Route path="/goals/" component={GoalList} />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
