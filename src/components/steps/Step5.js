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
        <div className="bill">
          <div className="items-display">
            <div className="flex">
              <p>Standard Fee:</p>
              <p>99.99€</p>
            </div>
            <div className="section">
              <div className="flex">
                <p>Frame:</p>
                <p>+ 450.00€</p>
              </div>
              <div className="sub section flex">
                <p>Fabric:</p>
                <p>+ 50.00€</p>
              </div>
              <div className="sub section flex">
                <p>Backboard:</p>
                <p>+ 50.00€</p>
              </div>
            </div>
            <div className="section">
              <div className="flex">
                <p>Legs:</p>
                <p>+ 50.00€</p>
              </div>
              <div className="sub section flex">
                  <p>Leg Material:</p>
                  <p>+ 10.00€</p>
              </div>
            </div>
          </div>
          <div className="total">
            <div className="flex">
              <p>TOTAL</p>
              <p>699.00€</p>
            </div>
          </div>
        </div>
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