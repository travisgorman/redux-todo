import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
// import { Provider, connect } from 'react-redux'
import './index.css'
let nextTodoId = 0

// todo reducer ---  called by the todos reducer
const todo = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      return (
        state.id !==
        action.id
      ) ? state
        : {
            ...state,
            completed: !state.completed
          }
    default:
      return state
  }
}
// todos reducer
const todos = (
  state = [],
  action
) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'REMOVE_TODO':
      return []
    default:
      return state
  }
}
// visibilityFilter reducer
const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
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
// =========================
// ========================= Footer
const Footer = () => (
  <p>
    Show:
      {'  '}
    <FilterLink
      filter='SHOW_ALL'>
      All
    </FilterLink>
      {'  '}
    <FilterLink
      filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
      {'  '}
    <FilterLink
      filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
  </p>
)
// =========================
// ========================= Link
const Link = ({
  active,
  onClick,
  children
}) => active
  ? <span>{children}</span>
  : <a
      href='#'
      onClick={e => {
        e.preventDefault()
        onClick()
      }}>
      {children}
    </a>

// =========================
// ========================= FilterLink
class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(
      () => this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render () {
    const props = this.props
    const state = store.getState()
    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() => store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    )
  }
}
// =========================
// ========================= Todo
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed
        ? 'line-through'
        : 'none'
    }}
  >
    {text}
  </li>
)
// =========================
// ========================= TodoList
const TodoList = ({
  todos,
  onTodoClick,
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() =>
          onTodoClick(todo.id)
        }
      />
    )}
  </ul>
)
// =========================
// ========================= AddTodo
const AddTodo = () => {
  let input
  return (
    <div>
      <input
        ref={node =>
          input = node
        }
      />
      <button
        onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          })
          input.value = ''
        }}
      >
        Add Todo
      </button>
    </div>
  )
}
// =========================
// ========================= getVisibleTodos
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
// =========================
// ========================= TodoApp
class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render () {
    const state = store.getState()
    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    )
  }
}
// =========================
// ========================= TodoApp
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
// =========================
// ========================= render
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('todo')
  )

// =========================
// ========================= subscribe to store
// store.subscribe(render)
// render()

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

