import { useEffect } from "react"
import "./Header.css"

const Header = (props) => {
  useEffect(() => {
    // Create string with the same value as the steps class
    let currentStep = "step-" + props.step
    let steps = document.getElementsByClassName("configurator-step")
    for (let elem of steps) {
      //Remove styling of the previous step
      elem.classList.remove("active")
      if (elem.classList[1] === currentStep) {
        // Add styling to the current step
        elem.classList.add("active")
      }
    };
  }) 
  return (
    <div className="Header">
      <div className="configurator-step step-1">
        <p className="configurator-step-text">
          STEP 1
        </p>
      </div>
      <div className="configurator-step step-2">
        <p className="configurator-step-text">
          STEP 2
        </p>
      </div>
      <div className="configurator-step step-3">
        <p className="configurator-step-text">
          STEP 3
        </p>
      </div>
      <div className="configurator-step step-4">
        <p className="configurator-step-text">
          STEP 4
        </p>
      </div>
      <div className="configurator-step step-5">
        <p className="configurator-step-text">
          STEP 5
        </p>
      </div>
    </div>
  );
}

export default Header;