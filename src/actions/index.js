import store from '../lib/store'

// in larger app would split up actions into subfiles / folders exported from index.js

// list actions that only change the state tree
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const SELECT_QUESTION = 'SELECT_QUESTION'
export const SWAP_QUESTIONS =  'SWAP_QUESTIONS'
export const CHANGE_QUESTION = 'CHANGE_QUESTION'
export const ADD_CHOICE = 'ADD_CHOICE'
export const DELETE_CHOICE = 'DELETE_CHOICE'
export const SWAP_CHOICES = 'SWAP_CHOICES'
export const CHANGE_CHOICE = 'CHANGE_CHOICE'

export function addQuestion(question) {
  store.dispatch({
    type: ADD_QUESTION,
    question: question.update('id', id => Date.now())
  })
}

export function deleteQuestion(question, index) {
  store.dispatch({ type: DELETE_QUESTION, question, index })
}

export function selectQuestion(question, index, offsetTop) {
  store.dispatch({ type: SELECT_QUESTION, question, index, offsetTop })
}

export function changeQuestion(question, index) {
  store.dispatch({ type: CHANGE_QUESTION, question, index })
}

export function swapQuestions(index1, index2, offsetTop) {
  store.dispatch({ type: SWAP_QUESTIONS, index1, index2, offsetTop })
}

export function addChoice(question, choice, afterChoiceIndex) {
  store.dispatch({
    type: ADD_CHOICE,
    question,
    choice: choice.update('id', id => Date.now()),
    afterChoiceIndex
  })
}

export function deleteChoice(question, choice) {
  store.dispatch({ type: DELETE_CHOICE, question, choice })
}

export function changeChoice(question, questionIndex, choice, choiceIndex) {
  store.dispatch({ type: CHANGE_CHOICE, question, questionIndex, choice, choiceIndex })
}

export function swapChoices(question, index1, index2) {
  store.dispatch({ type: SWAP_CHOICES, question, index1, index2 })
}
