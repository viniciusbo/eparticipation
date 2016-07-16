import React from 'react';

export default class DashboardIndex extends React.Component {
  static propTypes() {
    return {
      name: React.propTypes.string.isRequired,
      count: React.propTypes.number.isRequired
    };
  }

  render() {
    return (
      <div className="dashboard-index text-center">
        <h4>{this.props.count}</h4>
        <h4>{this.props.name}</h4>
      </div>
    );
  }
}