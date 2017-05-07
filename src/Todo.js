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
    case: 'TOGGLE_TODO':
      return [
        state.map((todo) => {
          if (todo.id !== action.id) {
            return todo
          }
          return {
            ...todo,
            completed: !todo.completed
          }
        })
      ]
    default:
      return state
  }
}

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
