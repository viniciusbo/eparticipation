import React from 'react';
import classNames from 'classnames'

import DashboardList from './DashboardList.jsx'

export default class Dashboard extends React.Component {
  static propTypes() {
    return {
      categories: React.PropTypes.object.isRequired,
      tweets: React.PropTypes.array.isRequired,
      onMoveFromList: React.PropTypes.func.isRequired,
      showUncategorizedList: React.PropTypes.bool.isRequired
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
    return this.props.categories.map((category, index) => {
      if (this.props.showUncategorizedList === false && category.name == 'Outros')
        return;

      const tweets = this.props.tweets.filter(tweet => tweet[1] == index).map(tweet => tweet[0]);
      const classes = classNames({
        'col-xs-15': this.props.showUncategorizedList === true,
        'col-xs-3': this.props.showUncategorizedList === false
      });
      return (
        <div key={index} className={classes} style={{borderTop: '5px solid ' + category.color}}>
          <DashboardList category={category} items={tweets} onMoveFromList={this.props.onMoveFromList.bind(null, index)} />
        </div>
      );
    });
  }
}