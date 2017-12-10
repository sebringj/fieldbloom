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
      return state.merge({
        selectedIndex: action.index,
        selectedOffsetTop: action.offsetTop
      })
    }

    case actions.DELETE_QUESTION: {
      let id = action.question.get('id')
      let questions = state.get('questions').filter(question => {
        return question.get('id') !== id
      })
      return state.merge({
        selectedIndex: -1,
        questions
      })
    }

    case actions.SWAP_QUESTIONS: {
      let questions = state.get('questions')
      const q1 = questions.get(action.index1)
      const q2 = questions.get(action.index2)
      questions = questions.set(action.index1, q2).set(action.index2, q1)
      let selectedIndex = state.get('selectedIndex')
      if (selectedIndex === action.index1)
        selectedIndex = action.index2
      else if (selectedIndex === action.index2)
        selectedIndex = action.index1
      return state.merge({
        selectedOffsetTop: action.offsetTop,
        selectedIndex,
        questions
      })
    }

    case actions.CHANGE_QUESTION: {
      return state.set('questions',
        state.get('questions').set(action.index, action.question)
      )
    }

    case actions.ADD_CHOICE: {
      let choices = action.question.get('choices')
        .insert(action.afterChoiceIndex + 1, action.choice)
      let updatedQuestion = action.question.set('choices', choices)
      let questionId = updatedQuestion.get('id')
      let qIndex = 0
      let questions = state.get('questions')
      for (let question of questions) {
        if (question.get('id') === questionId)
          break
        qIndex++
      }
      return state.set('questions', questions.set(qIndex, updatedQuestion))
    }

    case actions.CHANGE_CHOICE: {
      let choices = action.question.get('choices').set(action.choiceIndex, action.choice)
      let question = action.question.set('choices', choices)
      return state.set('questions',
        state.get('questions').set(action.questionIndex, question)
      )
    }

    case actions.SWAP_CHOICES: {
      let questionId = action.question.get('id')
      let qIndex = 0
      let questions = state.get('questions')
      for (let question of state.get('questions')) {
        if (question.get('id') === questionId) {
          let choices = question.get('choices')
          let choice1 = choices.get(action.index1)
          let choice2 = choices.get(action.index2)
          return state.set(
            'questions',
            questions.set(qIndex, question.set(
              'choices',
              choices
                .set(action.index1, choice2)
                .set(action.index2, choice1)
            ))
          )
        }
        qIndex++
      }
    }

    case actions.DELETE_CHOICE: {
      let choiceId = action.choice.get('id')
      let choices = action.question.get('choices').filter(choice => {
        return choice.get('id') !== choiceId
      })
      let changedQuestion = action.question.set('choices', choices)
      let questionId = changedQuestion.get('id')
      let questions = state.get('questions')
      let qIndex = 0
      for (let question of questions) {
        if (question.get('id') === questionId)
          break
        qIndex++
      }
      return state.set('questions', questions.set(qIndex, changedQuestion))
    }
  }

  return state
}

export default reducer
