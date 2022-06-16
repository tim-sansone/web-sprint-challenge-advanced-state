// ❗ You don't need to add extra action creators to achieve MVP
import * as types from "./action-types";
import axios from "axios";

export function moveClockwise() { return {type: types.MOVE_CLOCKWISE} }

export function moveCounterClockwise() { return {type: types.MOVE_COUNTERCLOCKWISE} }

export function selectAnswer(id) { return { type: types.SET_SELECTED_ANSWER, payload: id } }

export function setMessage(message) { return { type: types.SET_INFO_MESSAGE, payload: message } }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch({ type: types.RESET_QUIZ})
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data })
      })
      .catch(err => {
        debugger
      })
  }
}
export function postAnswer(payload) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post("http://localhost:9000/api/quiz/answer", payload)
      .then(res => {
        dispatch({ type: types.RESET_QUIZ})
        dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data.message })
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data })
      })
      .catch(err => {
        debugger
      })
      })
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
