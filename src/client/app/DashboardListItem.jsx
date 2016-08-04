import React from 'react';
import categories from './categories.js'

export default class DashboardListItem extends React.Component {
  static propTypes() {
    return {
      tweet: React.PropTypes.object.isRequired,
      onMoveFromList: React.PropTypes.func.isRequired
    };
  }

  render() {
    const place = (this.props.tweet.place && this.props.tweet.place.name) ? <small className="text-muted" title="Localização da publicação"><span className="fa fa-map-marker"></span>{this.props.tweet.place.name}</small> : null;
    return (
      <div className="list-group-item">
        <div className="item-text">{this.props.tweet.text}</div>

        <div className="list-group-item-footer">
          <button className="btn btn-link btn-xs text-muted pull-right" onClick={this.moveToList.bind(this)}><span className="fa fa-undo"></span></button>
          <a href={"https://twitter.com/intent/tweet?in_reply_to=" + this.props.tweet.id_str} target="_blank" title="Responder publicação"><small className="text-muted fa fa-reply"></small></a>
          <a href={"https://twitter.com/" + this.props.tweet.user.screen_name} target="_blank" title="Perfil do usuário no Twitter"><small className="text-muted">@{this.props.tweet.user.screen_name}</small></a>
          {place}
        </div>
      </div>
    );
  }

  moveToList() {
    this.props.onMoveFromList(this.props.tweet);
  }
}