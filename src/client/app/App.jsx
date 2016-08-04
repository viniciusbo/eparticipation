import React from 'react';
import io from 'socket.io-client'
import Modal from 'react-modal'
import categories from './categories.js'
import Dashboard from './Dashboard.jsx'

const socket = io('http://localhost:8789');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: categories,
      tweetToMove: null,
      moveFromListIndex: null,
      search: null
    };
    socket.on('tweet', this.onTweet.bind(this));
  }

  onTweet(tweet, classification) {
    const categoryIndex = classification[0][0];
    const list = this.state.lists.get(categoryIndex);
    const newItems = list.get('items').unshift(tweet);
    const newList = list.set('items', newItems);
    const newLists = this.state.lists.set(categoryIndex, newList);
    this.setState({ lists: newLists });
  }

  render() {
    const tweet = (this.state.tweetToMove != null) ? <p>{this.state.tweetToMove.text}</p> : null;
    return (
      <div className="">
        <Modal isOpen={this.state.tweetToMove != null} style={{
          content: {
            height: '180px'
          }
        }}>
          <button className="btn btn-link text-muted" onClick={this.closeModal.bind(this)}><span className="fa fa-close"></span></button>
          <div className="form-group">
            <label>Mover tweet:</label>
            {tweet}
          </div>
          <div className="form-group">
            <label>Para a categoria:</label>
            {this.renderListSelect()}
          </div>
        </Modal>

        <div className="form-group">
          <input type="text" placeholder="Digite para buscar tweets classificados" value={this.state.search} onChange={this.onSearchChange.bind(this)} className="form-control" />
        </div>
        
        <Dashboard lists={this.state.lists} onMoveFromList={this.onMoveFromList.bind(this)} />
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
      <select onChange={this.onMoveToList.bind(this)} className="form-control">
        <option value={-1}>Selecione uma categoria</option>
        {this.renderCategoriesOptions()}
      </select>
    );
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  renderCategoriesOptions() {
    return categories.map((category, index) => <option key={index} value={index}>{category.get('category').get('name')}</option>);
  }

  onMoveFromList(listIndex, tweet) {
    this.setState({ tweetToMove: tweet, moveFromListIndex: listIndex });
  }

  onMoveToList(event) {
    let fromList = this.state.lists.get(this.state.moveFromListIndex);
    const fromListItems = fromList.get('items');
    const tweetIndex = fromListItems.indexOf(this.state.tweetToMove);
    fromList = fromList.set('items', fromListItems.delete(tweetIndex));

    let toList = this.state.lists.get(event.target.value);
    toList = toList.set('items', toList.get('items').unshift(this.state.tweetToMove));
    const newLists = this.state.lists.set(this.state.moveFromListIndex, fromList).set(event.target.value, toList);
    this.setState({
      lists: newLists,
      tweetToMove: null,
      moveFromListIndex: null
    });
  }
}