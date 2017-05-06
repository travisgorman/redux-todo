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
  return list.concat([0])
}

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ]
}

deepFreeze(listBefore)

// const testAddCounter = () => {
//   const listBefore = []
//   const listAfter = [0]
//   expect(
//     addCounter(listBefore)
//   ).toEqual(listAfter)
// }

// const testRemoveCounter = () => {
//   const listBefore = [0, 10, 20]
//   const listAfter = [0, 20]

//     expect(
//     removeCounter(listBefore, 1)
//   ).toEqual(listAfter)
// }

// const testIncrementCounter = () => {
//   const listBefore = [0, 10, 20]
//   const listAfter = [0, 11, 20]

//   expect(
//     incrementCounter(listBefore, 1)
//   ).toEqual(listAfter)
// }

testAddCounter()
