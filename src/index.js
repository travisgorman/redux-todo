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
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>
)

// this connects the store to the redux devtools
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// the Redux store
const store = createStore(counter, devTools)

// the createStore function implemented from scratch
// const createStoreFromScratch = (reducer, devTools) => {
//   let state;
//   let listeners = []
//   const getState = () => state
//   const dispatch = (action) => {
//     state = reducer(action, state)
//     listeners.forEach(listener => listener())
//   }
//   const subscribe = (listener) => {
//     listeners.push(listener)
//     return () => {
//       listeners = listeners.filter((l) => l !== listener)
//     }
//   }
//   dispatch({})
//   return {getState, dispatch, subscribe}
// }

// the render function
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('counter')
  )
}

// subscribe to the store
store.subscribe(render)

// call the render function
render()
