import { useEffect } from "react"
import priceCalculator from "./priceCalculator.js"

const Step4 = (props) => {
  useEffect(() => {
    document.getElementById("price").innerText = priceCalculator().total + "€"
  })
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
        <div></div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(3)}}> previous </button>
          <p id="price">placeholder</p>
          <button className="next-button" onClick={() => {props.setSteps(5)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export default Step4