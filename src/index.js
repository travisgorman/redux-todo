import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'

// root reducer
// declares a default state of 0, and takes an action argument
// switch statement that returns a new state depending on the type of action
const counter = function(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// stateless functional display component
// displays the value and shows two buttons
// each button is given an event handler that will be passed in on render
const Counter = ({value, onIncrement, onDecrement}) => (
  <div className='counter'>
    <h1>{value}</h1>
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>
)

// this connects the store to the redux devtools
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// the Redux store
// uses createStore from Redux
// takes the reducer (counter)
// and connects to the devTools in browser
const store = createStore(counter, devTools);﻿

// render function mounts the Counter component to the DOM 'counter' element
// gets value from the store with store.getState()
// passes onIncrement and onDecrement props
// each dispatch an action to the store
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT',})}
      onDecrement={() => store.dispatch({type: 'DECREMENT',})}
    />,
      document.getElementById('counter')
  )
}

// subscribe to the store, passing in the render function
store.subscribe(render)
// call the render function
render()
