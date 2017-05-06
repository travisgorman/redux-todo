import counter from './reducers'
import expect from 'expect'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

expect(counter(0, { type: 'INCREMENT' })).toEqual(1)
expect(counter(1, { type: 'INCREMENT' })).toEqual(2)

expect(counter(2, { type: 'DECREMENT' })).toEqual(1)
expect(counter(1, { type: 'DECREMENT' })).toEqual(0)

expect(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1)

const addCounter = (list) => {
  list.push(0)
  return list
}

const addCounter = (list) => {
  return list.concat([0])
}

deepFreeze(listBefore)

const testAddCounter = () => {
  const listBefore = []
  const listAfter = [0]
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter)
}

testAddCounter()
console.log('all tests passed')
