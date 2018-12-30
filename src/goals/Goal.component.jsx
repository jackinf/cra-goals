import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Goal extends Component {
  render() {
    const { title, description, due, motivation } = this.props.goal;

    return (
      <div>
        <ul>
          <li>Title: {title}</li>
          <li>Description: {description}</li>
          <li>Due: {due}</li>
          <li>Motivation: {motivation}</li>
        </ul>
      </div>
    );
  }
}

Goal.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default Goal;
