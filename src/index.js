// import React from 'react';
import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import './index.css'
import expect from 'expect'

/*
      >>>>> REDUCERS
*/

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      return (state.id !== action.id)
        ? state
        : {
            ...state,
            completed: !state.completed
          }
    default:
      return state
  }
}
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    case 'REMOVE_TODO':
      return []
    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers)
//       .reduce(
//         (nextState, key) => {
//           nextState[key] = reducers[key](
//             state[key],
//             action
//           )
//         return nextState
//       },
//       {}
//     )
//   }
// }

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   }
// }

// the Root Reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

// const { createStore } = Redux;
const store = createStore(todoApp)

let nextTodoId = 0;
// View Layer - App Component
class TodoApp extends React.Component {
  render () {
    return (
      <div>
        <input ref={node => {
          this.input = node
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos} />,
    document.getElementById('todo')
  )
}
store.subscribe(render)
render()


// console.log( 'initial state:' )
// console.log( store.getState() )
// console.log( '--------------' )

// console.log( 'Dispatching ADD_TODO' )
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn Redux'
// })

// console.log( 'current state:' )
// console.log( store.getState() )
// console.log( '--------------' )

// console.log( 'Dispatching ADD_TODO again' )
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Have a coffee'
// })

// console.log( 'current state:' )
// console.log( store.getState() )
// console.log( '--------------' )

// console.log( 'Dispatching TOGGLE_TODO' )
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0
// })

// console.log( 'current state:' )
// console.log( store.getState() )
// console.log( '--------------' )

// console.log( 'successfully had a coffee' )
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 1
// })

// console.log( 'current state:' )
// console.log( store.getState() )
// console.log( '--------------' )

// console.log( 'Dispatching SET_VISIBILITY_FILTER' )
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// })

// console.log( 'current state:' )
// console.log( store.getState() )
// console.log( '--------------' )



/*
      >>>>> TESTS
*/

const testAddTodo = () => {
  const before = []
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const after = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]
  expect(
    todos(before, action)
  ).toEqual(after)
}

const testToggleTodo = () => {
  const before = [
    {
      id: 0,
      text: 'Add Todo',
      completed: false
    },
    {
      id: 1,
      text: 'Toggle Todo',
      completed: false
    }
  ]
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }
  const after = [
    {
      id: 0,
      text: 'Add Todo',
      completed: false
    },
    {
      id: 1,
      text: 'Toggle Todo',
      completed: true
    }
  ]
  expect(
    todos(before, action)
  ).toEqual(after)
}


testAddTodo()
console.log('all tests passed')
testToggleTodo()
console.log('all tests passed')

