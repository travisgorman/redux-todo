// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import expect from 'expect'
// import deepFreeze from 'deep-freeze'

/*
      >>>>> REDUCERS
*/

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false}
    case 'TOGGLE_TODO':
      // return (state.id !== action.id)
      //   ? state
      //   : { ...state, completed: !state.completed }
      if (state.id !== action.id) {
        return state
      }
      return {...state, completed: !state.completed}
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
      return action.filter;
    default:
      return state;
  }
}

const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}

// const { createStore } = Redux;
const store = createStore(todoApp)

console.log( 'initial state:' )
console.log( store.getState() )
console.log( '--------------' )

console.log( 'Dispatching ADD_TODO' )
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
})

console.log( 'current state:' )
console.log( store.getState() )
console.log( '--------------' )

console.log( 'Dispatching ADD_TODO again' )
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Have a coffee'
})

console.log( 'current state:' )
console.log( store.getState() )
console.log( '--------------' )

console.log( 'Dispatching TOGGLE_TODO' )
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

console.log( 'current state:' )
console.log( store.getState() )
console.log( '--------------' )

console.log( 'successfully had a coffee' )
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
})

console.log( 'current state:' )
console.log( store.getState() )
console.log( '--------------' )

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
