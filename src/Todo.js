import expect from 'expect'
console.log('expect:', expect )
import deepFreeze from 'deep-freeze'
console.log('deepFreeze:', deepFreeze )
/*
      >>>>> REDUCERS
*/

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false}
    case 'TOGGLE_TODO':
      return (state.id !== action.id)
        ? state
        : { ...state, completed: !state.completed }
    default:
      return state
  }
}
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    case 'REMOVE_TODO':
      return []
    default:
      return state
  }
}

/*
      >>>>> TESTS
*/

const testAddTodo = () => {
  // state before
  const before = []
  // action being dispatched
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const after = [
    { id: 0, text: 'Learn Redux', completed: false }
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
