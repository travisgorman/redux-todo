import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
  ? window.devToolsExtension() : (f) => f
))

export default store
