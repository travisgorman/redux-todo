import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'

// root reducer
const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state -1
    default:
      return state
  }
}

// stateless functional display component
const Counter = ({value, onIncrement, onDecrement }) => (
  <div className='counter'>
    <h1>{value}</h1>
    <button onClick={onDecrement}>{-}</button>
    <button onClick={onIncrement}>{+}</button>
  </div>
)

// this connects the store to the redux devtools


// the Redux store


// the render function


// subscribe to the store


// call the render function


