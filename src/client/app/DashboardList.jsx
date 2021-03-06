import React from 'react';
import DashboardIndex from './DashboardIndex.jsx'
import DashboardListItem from './DashboardListItem.jsx'

export default class DashboardList extends React.Component {
  static propTypes() {
    return {
      category: React.PropTypes.object.isRequired,
      items: React.PropTypes.array.isRequired,
      onMoveFromList: React.PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div>
        <DashboardIndex
          name={this.props.category.name}
          count={this.props.items.size}
          color={this.props.category.color} />
        <div className="list-group">
          {this.renderItems()}
        </div>
      </div>
    );
  }

  renderItems() {
    return this.props.items.map((tweet, index) => <DashboardListItem key={index} tweet={tweet} onMoveFromList={this.props.onMoveFromList} />);
  }
}