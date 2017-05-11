import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import store from './reducers.js'
import { getVisibleTodos } from './reducers'

/*
  ===================
  ===================
      COMPONENTS
  ===================
  ===================
*/
/*
  FilterLink
*/
const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick,
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault()
        onClick(filter)
      }}
    >
      {children}
    </a>
  )
}
/*
  Todo
*/
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
)
/*
  TodoList
*/
const TodoList = ({
  todos,
  onTodoClick,
}) => (
  <ul>
    {
      todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() =>
            onTodoClick(todo.id)
          }
        />
      )
    }
  </ul>
);
/*
  AddTodo
*/
const AddTodo = ({
  onAddClick,
}) => {
  let input
  return (
    <div>
      <input
        ref={node => {
          input = node
        }}
      />
      <button
        onClick={
          () => {
            onAddClick(input.value)
            input.value = ''
          }
        }>
        Add Todo
      </button>
    </div>
  )
}
/*
  Footer
*/
const Footer = ({
  visibilityFilter,
  onFilterClick,
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
);
/*
  TodoApp ~~~ Container Component
*/
let nextTodoId = 0;
// View Layer - App Component

const TodoApp = ({
  todos,
  visibilityFilter
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
      todos={
        getVisibleTodos(
          todos,
          visibilityFilter
        )
      }
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

/*

extract presentational components
Todo & TodoList

- remove key
- remove onClick handler and pass it in as a prop
- pass completed and text as separate props
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

