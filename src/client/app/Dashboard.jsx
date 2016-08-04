import React from 'react';

import DashboardList from './DashboardList.jsx'

export default class Dashboard extends React.Component {
  static propTypes() {
    return {
      lists: React.PropTypes.array.isRequired,
      onMoveFromList: React.PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderLists()}
        </div>
      </div>
    );
  }

  renderLists() {
    return this.props.lists.map((list, index) => {
      if (list.get('category').get('name') == 'Outros')
        return;

      return (
        <div key={index} className="col-xs-3" style={{borderTop: '5px solid ' + list.get('category').get('color')}}>
          <DashboardList category={list.get('category')} items={list.get('items')} onMoveFromList={this.props.onMoveFromList.bind(null, index)} />
        </div>
      );
    });
  }
}