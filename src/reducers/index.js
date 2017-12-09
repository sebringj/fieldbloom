import * as actions from '../actions'
const { Map, List } = require('immutable')

const initialState = Map({
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
      const questions = state.get('questions').map(q => {
        return q.update('selected', selected => false)
      })
      return state.set('questions', questions.push(action.question))
    }

    case actions.SELECT_QUESTION: {
      const questions = state.get('questions').map(q => {
        console.log(action.question.id)
        if (q.get('id') === action.question.id)
          return q.update('selected', selected => true)
        else
          return q.update('selected', selected => false)
      })
      return state.set('questions', questions)
    }

    default:
      return state
  }
}

export default reducer
