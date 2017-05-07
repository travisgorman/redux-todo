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
      return todo(undefined, action)
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}
// switch case with ternary
  // case: 'TOGGLE_TODO':
  //   return [
  //     state.map(todo => {
  //       todo.id === action.id
  //         ? todo : {
  //           ...todo,
  //           completed: !todo.completed
  //         }
  //     })
  //   ]

/*
      >>>>> NOTES

    * how the todos array is updated, and how each individual todo is updated


*/
/*
      >>>>> TESTING
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
  // freeze state and action
  deepFreeze(before)
  deepFreeze(action)
  // verify that our reduce works
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
  deepFreeze(before)
  deepFreeze(action)

  expect(
    todos(before, action)
  ).toEqual(after)
}
