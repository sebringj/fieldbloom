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
export const ORDER_CHOICE = 'ORDER_CHOICE'
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

export function swapQuestions(index1, index2) {
  store.dispatch({ type: SWAP_QUESTIONS, index1, index2 })
}

export function addChoice(question, choice) {
  store.dispatch({
    type: ADD_CHOICE,
    question,
    choice: choice.update('id', id => Date.now())
  })
}

export function deleteChoice(question, choice) {
  store.dispatch({ type: DELETE_CHOICE, question, choice })
}

export function orderChoice(question, choice, order) {
  store.dispatch({ type: ORDER_CHOICE, question, choice, order })
}

export function changeChoice(question, questionIndex, choice, choiceIndex) {
  store.dispatch({ type: CHANGE_CHOICE, question, questionIndex, choice, choiceIndex })
}
