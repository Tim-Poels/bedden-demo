import priceCalculator from "./priceCalculator.js"

const Step4 = (props) => {
  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">5</p>
        </div>
        <p className="title">
          CHECKOUT
        </p>
      </div>
      <div className="checkout-tab">

      </div>
      <div className="step-container">
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(4)}}> previous </button>
          <button className="next-button">ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default Step4