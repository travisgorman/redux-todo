import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

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
const Counter = (props) => (
  <div className='counter'>
    <h1>{props.value}</h1>
    <button onClick={props.onDecrement}>-</button>
    <button onClick={props.onIncrement}>+</button>
  </div>
)

// the Redux store
const store = createStore(counter, devTools)

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
