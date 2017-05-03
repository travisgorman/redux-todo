import React from 'react';
// import { createStore } from 'redux'
// import logo from './logo.svg';
import './App.css';
import store from './index.js'


const App = React.createClass({
  onDecrement () {
    store.dispatch({type: 'DECREMENT'})
  },
  onIncrement () {
    store.dispatch({type: 'INCREMENT'})
  },
  render () {
    return (
      <div>
        <h1>{value}</h1>
        <button onClick={this.onDecrement}>-</button>
        <button onClick={this.onIncrement}>+</button>
      </div>
    )
  }
})

export default App;
