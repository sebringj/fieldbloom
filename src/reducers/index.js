import * as actions from '../actions'
const { Map, List } = require('immutable')

const initialState = Map({
  selectedIndex: -1,
  questions: List()
})

// in a larger app would use combineReducers and split up
// reducers in files/folders exported from index.js
function reducer(state = initialState, action) {
  /*
  ADD_QUESTION
  DELETE_QUESTION
  SELECT_QUESTION
  ORDER_QUESTION
  CHANGE_TEXT
  ADD_FIELD
  DELETE_FIELD
  ORDER_FIELD
  */

  switch(action.type) {

    case actions.ADD_QUESTION: {
      const questions = state.get('questions').map((q, index) => {
        return q.set('index', index)
      })
      return state.merge({
        selectedIndex: -1,
        questions: questions.push(action.question.set('index', questions.length)),
      })
    }

    case actions.SELECT_QUESTION: {
      let selectedIndex = -1
      let i = 0
      for (let q of state.get('questions')) {
        if (q.get('id') === action.question.id) {
          selectedIndex = i
          break
        }
        i++
      }
      return state.merge({
        selectedIndex,
        selectedBoundingClientRect: action.boundingClientRect
      })
    }

    default:
      return state
  }
}

export default reducer
