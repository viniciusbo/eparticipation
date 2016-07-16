import React from 'react';
import io from 'socket.io-client'
import { Map, List } from 'immutable'

import Dashboard from './Dashboard.jsx'

const socket = io('http://localhost:8789');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: List([
      Map({
        category: Map({
          name: 'Transporte',
          color: 'green'
        }),
        items: List()
      }),
      Map({
        category: Map({
          name: 'Educação',
          color: 'blue'
        }),
        items: List()
      }),
      Map({
        category: Map({
          name: 'Lazer',
          color: 'orange'
        }),
        items: List()
      }),
      Map({
        category: Map({
          name: 'Segurança pública',
          color: 'brown'
        }),
        items: List()
      }),
      Map({
        category: Map({
          name: 'Saúde',
          color: 'green'
        }),
        items: List()
      }),
      Map({
        category: Map({
          name: 'Outros',
          color: 'gray'
        }),
        items: List()
      })
    ]) };
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
    return (
      <div className="">
        <Dashboard lists={this.state.lists} />
      </div>
    );
  }
}