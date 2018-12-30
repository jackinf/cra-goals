import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import GoalList from "./goals/GoalList.component";
import Login from "./auth/Login.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/goals/" component={GoalList} />
        </div>
      </Router>
    );
  }
}

export default App;
