import React from 'react'
import './App.css'
import store from './index.js'
import { connect } from 'react-redux'
const { number, func } = React.PropTypes

const Counter = React.createClass({
  propTypes: {value: number, onIncrement: func, onDecrement: func},
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

const mapStateToProps(state, props) {
  return {
    value: state.value
  }
}
export default connect(mapStateToProps)(Counter)
