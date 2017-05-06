import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store'
import Counter from './Counter'

ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
    onDecrement={() => store.dispatch({type: 'DECREMENT'})}
  />,
  document.getElementById('counter')
)
