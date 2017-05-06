import React from 'react'
import './App.css'
// import store from './index.js'
import { Provider, connect } from 'react-redux'
import store from './store'
const { number, func } = React.PropTypes

const Counter = React.createClass({
  propTypes: {value: number, onIncrement: func, onDecrement: func},
  render() {
    return (
      <Provider store={store}>
          <h1>{this.props.value}</h1>
          <button onClick={this.props.onDecrement}>-</button>
          <button onClick={this.props.onIncrement}>+</button>
      </Provider>
    )
  }
})

const mapStateToProps = function(state, props) {
 return { value: state.value }
}

function square(x) {
  return x * x
}

function squareAll(items) {
  return items.map(square)
}

console.log(square(5))
const numbers = [2, 5, 6, 7, 9]

console.log('squareAll:', squareAll(numbers))

const all = squareAll(numbers)
console.log('all:', all )

export default Counter
