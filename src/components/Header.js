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
      elem.classList.remove("done")
    };
    for (let elem of steps) {
      if (elem.classList.contains(currentStep)) {
          // Add styling to the current step
          elem.classList.add("active")
          break;
      }
      else {
        elem.classList.add("done")
      }
    };
  }) 
  return (
    <div className="Header">
      <div className="configurator-step step-1">
        <p className="configurator-step-text">
          STEP1
        </p>
      </div>
      <div className="configurator-step step-2">
        <p className="configurator-step-text">
          STEP2
        </p>
      </div>
      <div className="configurator-step step-3">
        <p className="configurator-step-text">
          STEP3
        </p>
      </div>
      <div className="configurator-step step-4">
        <p className="configurator-step-text">
          STEP4
        </p>
      </div>
      <div className="configurator-step step-5">
        <p className="configurator-step-text">
          STEP5
        </p>
      </div>
    </div>
  );
}

export default Header;