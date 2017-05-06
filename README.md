#Redux To-do and Counter
from Dan Abramov's egghead course

## Three Principles of Redux
1. The entire state of the application will be represented by ONE object
  - referred to as the *state*, or *state tree*
  - No matter the complexity of the application - one JavaScript object
  - all changes and mutations are explicit
2. The state tree is *read only*
  - to change the state, you dispatch an *action*
  - just like the state is the minimal representation of the data, the action is the minimal representation of the change to that data
  - the only requirement for an action is that it has a `type` property. (string)
3. State mutations are described by the reducer function


### Pure and Impure functions

#### Pure Functions
```js
function square(x) {
  return x * x
}

function squareAll(items) {
  return items.map(square)
}
```
#### Impure Functions

```js
function square (x) {
  updateXinDatabase(x)
  return x * x
}

function squareAll (items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i])
  }
}
```
React introduced the idea that the UI layer is most predictable when it is described as a pure function of the application's state

In a Redux application there is one particular function that takes the previous state and the action being dispatched,  and returns the next state of the whole application
