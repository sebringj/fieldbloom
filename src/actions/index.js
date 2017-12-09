import store from '../lib/store'

// in larger app would split up actions into subfiles / folders exported from index.js

// list actions that only change the state tree
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const SELECT_QUESTION = 'SELECT_QUESTION'
export const ORDER_QUESTION =  'ORDER_QUESTION'
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const ADD_FIELD = 'ADD_FIELD'
export const DELETE_FIELD = 'REMOVE_FIELD'
export const ORDER_FIELD = 'ORDER_CHOICE'

export function addQuestion(question, boundingClientRect) {
  store.dispatch({
    type: ADD_QUESTION,
    question: question.update('id', id => Date.now())
  })
}

export function deleteQuestion(question) {
  store.dispatch({ type: DELETE_QUESTION, question })
}

export function selectQuestion(question, offsetTop) {
  store.dispatch({ type: SELECT_QUESTION, question, offsetTop })
}

export function orderQuestion(question, order) {
  store.dispatch({ type: ORDER_QUESTION, question, order })
}

export function changeText(question, field, text) {
  store.dispatch({ type: CHANGE_TEXT, question, field, text })
}

export function addField(question, field) {
  store.dispatch({ type: ADD_FIELD, question, field })
}

export function deleteField(question, field) {
  store.dispatch({ type: DELETE_FIELD, question, field })
}

export function orderField(question, field, order) {
  store.dispatch({ type: ORDER_FIELD, question, field, order })
}
