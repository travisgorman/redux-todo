  // flips the `completed` value to its opposite
const toggleTodo = (todo) => {
  // return Object.assign({}, todo, {
  //   completed: !todo.completed
  // })
  return {
    ...todo,
    completed: !todo.completed
  }
}

const testToggleTodo = () => {
  const before = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  }
  const after = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  }
  expect(
    toggleTodo(before)
  ).toEqual(after)
}
testToggleTodo()
