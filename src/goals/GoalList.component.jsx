import React, {Component} from 'react';
import {getGoals} from './Goal.api';
import Goal from "./Goal.component";

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {paginatedList: {}};
  }

  async componentDidMount() {
    const paginatedList = await getGoals();
    this.setState({paginatedList});
  }

  render() {
    return (
      <div>
        <h2>Goals:</h2>
        {this.state.paginatedList &&
          this.state.paginatedList.items &&
          this.state.paginatedList.items.map((goal, index) => <Goal key={index} goal={goal} /> )}
      </div>
    );
  }
}

export default GoalList;
