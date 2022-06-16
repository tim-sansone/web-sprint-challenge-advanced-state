import React from 'react'
import { connect } from "react-redux";
import * as actions from "../state/action-creators"

function Wheel(props) {

  
  const handleClick = event => {
    if(event.target.value === "clockwise") props.moveClockwise();
    else props.moveCounterClockwise();
  }

  return (
    <div id="wrapper">
      {/* <div id="wheel">
        <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>
      </div> */}
      <div id="wheel">
          {
            [0, 1, 2, 3, 4, 5].map(index => (
              <div
                key={index}
                className={`cog${index === props.wheel ? ' active' : ''}`}
                style={{ "--i": index }}
              >
                {index === props.wheel ? 'B' : null}
              </div>
            ))
          }
        </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" value="counter-clockwise" onClick={handleClick}>Counter clockwise</button>
        <button id="clockwiseBtn" value="clockwise" onClick={handleClick}>Clockwise</button>
      </div>
    </div>
  )
}


export default connect(state => state, actions)(Wheel);
