import { createStore } from 'redux'
import counter from './reducers'
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
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(counter, devTools)
export default store
