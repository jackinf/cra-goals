import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import './App.css';
import GoalList from "./goals/GoalList.component";
import GoalNew from "./goals/Goal.new.component";
import GoalEdit from "./goals/Goal.edit.component";
import GoalView from "./goals/Goal.view.component";
import Login from "./auth/Login.component";
import {isLoggedIn} from "./auth/Auth.api";
import DefaultAppBar from './common/DefaultAppBar.component';

function App() {
  if (!isLoggedIn()) {
    return (
      <Router>
        <Switch>
          <Route path="*" exact component={Login} />
        </Switch>
      </Router>
    )
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <div>
          <DefaultAppBar />

          <Switch>
            <Route path="/" exact component={GoalList} />
            <Route path="/goals" exact component={GoalList} />
            <Route path="/goals/new" exact component={GoalNew} />
            <Route path="/goals/:id/edit" exact component={GoalEdit} />
            <Route path="/goals/:id" exact component={GoalView} />
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;