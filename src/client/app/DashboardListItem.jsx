import React from 'react';

export default class DashboardListItem extends React.Component {
  static propTypes() {
    return {
      tweet: React.PropTypes.object.isRequired
    };
  }

  render() {
    const placeName = (this.props.tweet.place && this.props.tweet.place.name) ? this.props.tweet.place.name : null;
    return (
      <div className="list-group-item">
        <div className="item-text">{this.props.tweet.text}</div>
        <small className="text-muted pull-right">{placeName}</small>
        <small className="text-muted">@{this.props.tweet.user.screen_name}</small>
      </div>
    );
  }
}