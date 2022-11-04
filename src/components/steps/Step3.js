// import { scene } from "../CanvasElement.js";

const Step3 = (props) => {
  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">3</p>
        </div>
        <p className="title">
          LEGS
        </p>
      </div>
      <div className="step-container">
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(2)}}> previous </button>
          <button className="next-button" onClick={() => {props.setSteps(4)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export default Step3