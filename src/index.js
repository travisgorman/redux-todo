import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const { number, func } = React.PropTypes
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
// const Counter = (props) => ({
//   value: props.value,
//   onIncrement () {
//     return store.dispatch({type: 'INCREMENT'})
//   },
//   onDecrement () {
//     return store.dispatch({type: 'DECREMENT'})
//   },
//   render () {
//     return (
//       <div className='counter'>
//         <h1>{props.value}</h1>
//         <button onClick={props.onDecrement}>-</button>
//         <button onClick={props.onIncrement}>+</button>
//       </div>
//     )
//   }
// })

const Counter = React.createClass({
  propTypes: {
    value: number,
    onIncrement: func,
    onDecrement: func
  },
  render() {
    return (
      <div className='counter'>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onDecrement}>-</button>
        <button onClick={this.props.onIncrement}>+</button>
      </div>
    )
  }
})

// the Redux store
const store = createStore(counter, devTools)

ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
    onDecrement={() => store.dispatch({type: 'DECREMENT'})}
  />,
  document.getElementById('counter')
)
