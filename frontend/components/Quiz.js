import React from 'react'
import { connect } from "react-redux"
import * as actions from "../state/action-creators"

function Quiz(props) {

  const { quiz, selectedAnswer } = props;

  !quiz && props.fetchQuiz()

  const id1 = quiz?.answers[quiz.rand1]["answer_id"];
  const id2 = quiz?.answers[quiz.rand2]["answer_id"];

  const handleClick = id => props.selectAnswer(id)

  const handleSubmit = () => {
    const payload = {
      "quiz_id": quiz["quiz_id"],
      "answer_id": selectedAnswer
    }
    props.postAnswer(payload)
  }

  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${selectedAnswer === id1 ? " selected" : ""}`}>
                {quiz.answers[quiz.rand1].text}
                <button onClick={() => handleClick(id1)}>
                  {selectedAnswer === id1 ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`answer${selectedAnswer === id2 ? " selected" : ""}`}>
                {quiz.answers[quiz.rand2].text}
                <button onClick={() => handleClick(id2)}>
                {selectedAnswer === id2 ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actions)(Quiz);
