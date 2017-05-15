import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import './index.css'
let nextTodoId = 0

// =========================
// ========================= todo reducer
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
// =========================
// ========================= todos reducer
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
// =========================
// ========================= visibilityFilter reducer
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
// =========================
// ========================= Footer
const Footer = ({ store }) => (
  <p>
    Show:
      {'  '}
    <FilterLink
      filter='SHOW_ALL'
      store={store}>
      All
    </FilterLink>
      {'  '}
    <FilterLink
      filter='SHOW_ACTIVE'
      store={store}>
      Active
    </FilterLink>
      {'  '}
    <FilterLink
      filter='SHOW_COMPLETED'
      store={store}>
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
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render () {
    const props = this.props
    const { store } = this.context
    const state = store.getState()
    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
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
FilterLink.contextTypes = {
  store: React.PropTypes.object
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
const AddTodo = (props, { store }) => {
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
AddTodo.contextTypes = {
  store: React.PropTypes.object
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
// ========================= mapStateToProps
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}
// =========================
// ========================= mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}
// ========================= connect container (VisibleTodoList)
// ========================= to presentation (TodoList)
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

// =========================
// ========================= VisibleTodoList
// class VisibleTodoList extends React.Component {
//   componentDidMount() {
//     const { store } = this.context
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     )
//   }
//   componentWillUnmount() {
//     this.unsubscribe()
//   }
//   render () {
//     const { store } = this.context
//     const state = store.getState()
//     return (
//       <TodoList
//         todos={
//           getVisibleTodos(
//             state.todos,
//             state.visibilityFilter
//           )
//         }
//         onTodoClick={id =>
//           store.dispatch({
//             type: 'TOGGLE_TODO',
//             id
//           })
//         }
//       />
//     )
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// }
// ========================= TodoApp
// ========================= The Root Component
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
// ========================= todoApp
// ========================= The Root Reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
// =========================
// ========================= ReactDOM.render
  ReactDOM.render(
    <Provider store={createStore(todoApp)}>
      <TodoApp />
    </Provider>,
    document.getElementById('todo')
  )
