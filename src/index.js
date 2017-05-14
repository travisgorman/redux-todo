import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import './index.css'
let nextTodoId = 0
/*
  ===================
  ===================
      REDUCERS
  ===================
  ===================
*/
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

/*
  ===================
  ===================
      COMPONENTS

      From TodoApp, extract:
        - Todo: the individual Todo item rendered
        - TodoList: maps the `todos` array, and renders visible todos (as according to filter)
        - AddTodo: text input and button. creates and adds a todo item to the todos array
        - Footer: Contains 3 links, one for each filter, show all, active, or completed
  ===================
  ===================
*/


const AddTodo = ({
  onAddClick
}) => {
  let input
  return (
    <div>
      <input
          ref={
            node => input = node
          }
        />
        <button
          onClick={() => {
            onAddClick(input.value)
            input.value = ''
          }}
        >
          Add Todo
        </button>
    </div>
  )
}

const FilterLink = ({
  filter,
  currentFilter,
  onClick,
  children,
}) => {
  return (
    filter === currentFilter
      ? <span>{children}</span>
      : <a href='#'
          onClick={e => {
          e.preventDefault()
          onClick(filter)
        }}>
          {children}
        </a>
  )
}

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {'  '}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
      >
      All
    </FilterLink>
    {'  '}
    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
      >
      Active
    </FilterLink>
    {'  '}
    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
      >
      Completed
    </FilterLink>
  </p>
)

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

const TodoApp = ({
  todos,
  visibilityFilter,
}) => (
  <div>
    <AddTodo
      onAddClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }
    />
    <TodoList
      todos={getVisibleTodos(
        todos,
        visibilityFilter
      )}
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
)


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

