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

  console.log(action)

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
      return state.merge({
        selectedIndex: action.index,
        selectedOffsetTop: action.offsetTop
      })
    }

    case actions.CHANGE_QUESTION: {
      return state.set('questions',
        state.get('questions').set(action.index, action.question)
      )
    }

    case actions.CHANGE_CHOICE: {
      let choices = action.question.get('choices').set(action.choiceIndex, action.choice)
      let question = action.question.set('choices', choices)
      return state.set('questions',
        state.get('questions').set(action.questionIndex, question)
      )
    }
  }

  return state
}

export default reducer
