import React from 'react'
import { connect } from "react-redux";

function Wheel(props) {

  console.log(props);
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
        <button id="counterClockwiseBtn" >Counter clockwise</button>
        <button id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, {})(Wheel);
