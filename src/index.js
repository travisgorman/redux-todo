import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'


// root reducer
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

const function counter (state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
// display component
// const Counter = ({
//   value,
//   onIncrement,
//   onDecrement,
// }) => (
//   <div className="counter">
//     <h1>{value}</h1>
//       <button onClick={onDecrement} >-</button>
//       <button onClick={onIncrement} >+</button>
//   </div>
// )

// store

// const store = createStore(counter)

// render component to DOM root element
// const render = () => {
//   ReactDOM.render(
//     <Counter
//       value={store.getState()}
//       onIncrement={() => store.dispatch({type: 'INCREMENT',})}
//       onDecrement={() => store.dispatch({type: 'DECREMENT',})}
//     />,
//     document.getElementById('counter')
//   )
// }

// store.subscribe(render)
// render()
