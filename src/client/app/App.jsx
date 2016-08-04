import React from 'react';
import io from 'socket.io-client'
import Modal from 'react-modal'
import { List } from 'immutable'

import categories from './categories.js'
import Dashboard from './Dashboard.jsx'

const socket = io('http://localhost:8789');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: categories,
      tweets: List(),
      tweetToMove: null,
      moveFromListIndex: null,
      search: '',
      showUncategorizedList: false,
      showHeading: true,
    };
    socket.on('tweet', this.onTweet.bind(this));
  }

  onTweet(tweet, classification) {
    const uncategorizedListIndex = this.state.categories.length - 1;
    const categoryIndex = (classification[0][0] === -1) ? uncategorizedListIndex : classification[0][0];
    this.setState({ tweets: this.state.tweets.unshift([tweet, categoryIndex]) });
  }

  render() {
    const tweet = (this.state.tweetToMove != null) ? <p>{this.state.tweetToMove.text}</p> : null;
    let tweets = this.state.tweets;
    if (this.state.search !== '')
      tweets = this.state.tweets.filter(tweet => tweet[0].text.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1);
    return (
      <div className="">
        <Modal isOpen={this.state.tweetToMove != null} style={{
          content: {
            height: '180px'
          }
        }}>
          <button className="btn btn-link text-muted pull-right" onClick={this.closeModal.bind(this)}><span className="fa fa-close"></span></button>
          <div className="form-group">
            <label>Mover tweet:</label>
            {tweet}
          </div>
          <div className="form-group">
            <label>Para a categoria:</label>
            {this.renderListSelect()}
          </div>
        </Modal>

        <div className="container-fluid">
          <h1 className="page-title">Painel de E-participação</h1>

          <div className="form-group">
            <input type="text" placeholder="Digite para buscar tweets classificados" value={this.state.search} onChange={this.onSearchChange.bind(this)} className="form-control" />
          </div>

          <div className="form-group">
            <button className="btn btn-block" onClick={this.toggleUnategorizedList.bind(this)}>Exibir/esconder {this.state.tweets.filter(tweet => tweet[1] === this.state.categories.length - 1).size} tweet(s) não categorizado(s)</button>
          </div>
        </div>


        <Dashboard categories={this.state.categories} tweets={tweets} onMoveFromList={this.onMoveFromList.bind(this)} showUncategorizedList={this.state.showUncategorizedList} />
      </div>
    );
  }

  closeModal() {
    this.setState({
      tweetToMove: null,
      moveFromListIndex: null
    });
  }

  renderListSelect() {
    if (this.state.listSelect === false)
      return;

    return (
      <select onChange={this.onMoveToList.bind(this)} defaultValue={this.state.moveFromListIndex} className="form-control">
        {this.renderCategoriesOptions()}
      </select>
    );
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  renderCategoriesOptions() {
    return categories.map((category, index) => <option key={index} value={index}>{category.name}</option>);
  }

  onMoveFromList(listIndex, tweet) {
    this.setState({ tweetToMove: tweet, moveFromListIndex: listIndex });
  }

  toggleUnategorizedList() {
    this.setState({ showUncategorizedList: !this.state.showUncategorizedList });
  }

  onMoveToList(event) {
    const tweetIndex = this.state.tweets.findKey(tweet => tweet[0] === this.state.tweetToMove);
    const tweets = this.state.tweets.delete(tweetIndex).unshift([this.state.tweetToMove, event.target.value]);
    this.setState({
      tweets: tweets,
      tweetToMove: null,
      moveFromListIndex: null
    });
  }
}