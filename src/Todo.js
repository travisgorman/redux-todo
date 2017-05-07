// writing a Todo list reducer --
// adding a todo
// toggling a todo
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

// testing the todo reducer
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
  const after = [
    {
      id: 0,
      text: 'Add Todo',
      completed: true
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
