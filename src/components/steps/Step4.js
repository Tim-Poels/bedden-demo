const Step4 = (props) => {
  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">4</p>
        </div>
        <p className="title">
          ???
        </p>
      </div>
      <div className="step-container">
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(3)}}> previous </button>
          <button className="next-button" onClick={() => {props.setSteps(5)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export default Step4