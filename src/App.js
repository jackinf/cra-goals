import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import GoalList from "./goals/GoalList.component";
import Goal from "./goals/Goal.component";
// import Login from "./auth/Login.component";
import Login from "./auth/Login2.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/goals/:id" exact component={Goal} />
          <Route path="/goals/" component={GoalList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
