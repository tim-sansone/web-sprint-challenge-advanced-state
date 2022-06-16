// ❗ You don't need to add extra action creators to achieve MVP
import * as types from "./action-types";
import axios from "axios";

export function moveClockwise() { return {type: types.MOVE_CLOCKWISE} }

export function moveCounterClockwise() { return {type: types.MOVE_COUNTERCLOCKWISE} }

export function selectAnswer(id) { return { type: types.SET_SELECTED_ANSWER, payload: id } }

export function setMessage(message) { return { type: types.SET_INFO_MESSAGE, payload: message } }

export function setQuiz(quiz) { return { type: types.SET_QUIZ_INTO_STATE, payload: quiz } }

export function resetQuiz() { return { type: types.RESET_QUIZ } }

export function inputChange(name, value) {
  return { type: types.INPUT_CHANGE, payload: { name, value } }
}

export function resetForm() { return { type: types.RESET_FORM } }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // dispatch(resetQuiz())
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(setMessage(err))
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
        // dispatch(resetQuiz())
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz())
      })
      .catch(err => {
        console.log(err)
        dispatch(setMessage(err))
      })
  }
}
export function postQuiz(payload) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post("http://localhost:9000/api/quiz/new", payload)
      .then(res => {
        const congrats = `Congrats: "${res.data.question}" is a great question!`
        dispatch(setMessage(congrats))
        dispatch(resetForm())
      })
      .catch(err => {
        console.log(err)
        dispatch(setMessage(err))
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
