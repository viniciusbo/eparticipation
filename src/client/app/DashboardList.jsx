import React from 'react';
import DashboardIndex from './DashboardIndex.jsx'
import DashboardListItem from './DashboardListItem.jsx'

export default class DashboardList extends React.Component {
  static propTypes() {
    return {
      category: React.PropTypes.object.isRequired,
      items: React.PropTypes.array.isRequired
    };
  }

  render() {
    return (
      <div>
        <DashboardIndex
          name={this.props.category.get('name')}
          count={this.props.items.size}
          color={this.props.category.get('color')} />
        <div className="list-group">
          {this.renderItems()}
        </div>
      </div>
    );
  }

  renderItems() {
    return this.props.items.map((tweet, index) => <DashboardListItem key={index} tweet={tweet} />);
  }
}