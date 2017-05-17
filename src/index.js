import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import './index.css'
let nextTodoId = 0

/*
        REDUCERS
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

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state
        .map(t =>
          todo(t, action)
        )
    case 'REMOVE_TODO':
      return []
    default:
      return state
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos
        .filter(
          t => !t.completed
        )
    case 'SHOW_COMPLETED':
      return todos
        .filter(
          t => t.completed
        )
    default:
      return todos
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


const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

/*
      COMPONENTS
*/

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
// ========================= Link
const Link = ({active, onClick, children, }) =>
  active
    ? <span>{children}</span>
    : <a
      href='#'
      onClick={e => {
        e.preventDefault()
        onClick()
      }}>
      {children}
    </a>
// ========================= Todo
const Todo = ({ onClick, completed, text }) => (
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
// ========================= TodoList
const TodoList = ({ todos, onTodoClick }) => (
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
// ========================= AddTodo
let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button
        onClick={() => {
          dispatch(
            addTodo(input.value)
          )
          input.value = ''
        }}>
        Add Todo
      </button>
    </div>
  )
}
// ========================= Link: map state to props
const mapStateToLinkProps = (state, ownProps) => {
  return {
    active:
      ownProps.filter ===
      state.visibilityFilter
  }
}
// ========================= Link: map dispatch to props
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  }
}
// ========================= TodoList: map state to props
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}
// ========================= TodoList: map dispatch to props
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}
// ================ connect `FilterLink` and `Link`
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)
// ================= connect `VisibleTodoList` to `TodoList`
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)
// ========================= connect `AddTodo` to the store
AddTodo = connect()(AddTodo)
// ========================= The Top-Level Root Component
// ========================= TodoApp
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
// ========================= The Redux Root Reducer
// ========================= todoApp
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
// ========================= The React Render Function
// ========================= Renders Provider containing the store
  ReactDOM.render(
    <Provider store={createStore(todoApp)}>
      <TodoApp />
    </Provider>,
    document.getElementById('todo')
  )
