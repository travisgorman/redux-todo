import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import './index.css'
// import expect from 'expect'

// todo reducer ---  called by the todos reducer
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

// todos reducer
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

// visibilityFilter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

// The Root Reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

// the Redux store
const store = createStore(todoApp)

const FilterLink = ({
  filter,
  children
}) => {
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    >
      {children}
    </a>
  )
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    default:
      return todos
  }
}

let nextTodoId = 0;

// View Layer - App Component
class TodoApp extends React.Component {
  render () {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    )
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
          this.input.value = ''
        }}>
          Add Todo
        </button>
        <ul>
          {visibleTodos.map(todo =>
            <li key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                })
                console.log('todo:', todo )
              }}
              style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {'  '}
          <FilterLink filter='SHOW_ALL'>
            All
          </FilterLink>
          {'  '}
          <FilterLink filter='SHOW_ACTIVE'>
            Active
          </FilterLink>
          {'  '}
          <FilterLink filter='SHOW_COMPLETED'>
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}



const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()} />,
    document.getElementById('todo')
  )
}

store.subscribe(render)
render()

/*  TODO

  -- onClick of individual todo, toggle complete
    -- Todo component
  -- Footer component with visibility filters

  */


// const testAddTodo = () => {
//   const before = []
//   const action = {
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux'
//   }
//   const after = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false
//     }
//   ]
//   expect(
//     todos(before, action)
//   ).toEqual(after)
// }

// const testToggleTodo = () => {
//   const before = [
//     {
//       id: 0,
//       text: 'Add Todo',
//       completed: false
//     },
//     {
//       id: 1,
//       text: 'Toggle Todo',
//       completed: false
//     }
//   ]
//   const action = {
//     type: 'TOGGLE_TODO',
//     id: 1
//   }
//   const after = [
//     {
//       id: 0,
//       text: 'Add Todo',
//       completed: false
//     },
//     {
//       id: 1,
//       text: 'Toggle Todo',
//       completed: true
//     }
//   ]
//   expect(
//     todos(before, action)
//   ).toEqual(after)
// }


// testAddTodo()
// console.log('all tests passed')
// testToggleTodo()
// console.log('all tests passed')

