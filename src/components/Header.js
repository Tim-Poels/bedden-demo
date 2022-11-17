import { useEffect } from "react"
import "./Header.css"
import { ReactComponent as Svg5 } from "../assets/svgs/cart2-svgrepo-com.svg"
import { ReactComponent as Svg7 } from "../assets/svgs/full-view-svgrepo-com.svg"
import { ReactComponent as Svg8 } from "../assets/svgs/furniture-home-house-7-svgrepo-com.svg"
import  { ReactComponent as Svg10 } from "../assets/svgs/silk-svgrepo-com.svg"

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

  let standardColor = "lightgrey"

  let stroke1 = standardColor
  let stroke2 = standardColor
  let stroke3 = standardColor
  let stroke4 = standardColor
  let stroke5 = standardColor

  let highlight = "black"

  switch (props.step) {
    case 1: 
      stroke1 = highlight
      break;
    case 2: 
      stroke2 = highlight
      break;
    case 3: 
      stroke3 = highlight
      break;
    case 4: 
      stroke4 = highlight
      break;
    case 5: 
      stroke5 = highlight
      break;
    default:
      stroke1 = highlight
  }

  return (
    <div className="Header">
      <div className="configurator-step step-1">
        <div className="configurator-step-text">
          <div>
            Step 
            <br></br>
            <span>1</span>
          </div>
          <Svg7 className="svg svg1" fill={stroke1}/>
        </div>
        <div className="arrow">
          <div className="arrow-cover"></div>
        </div>
      </div>
      <div className="configurator-step step-2">
        <div className="configurator-step-text">
         <div>
            Step 
            <br></br>
            <span>2</span>
          </div>
          <Svg10 className="svg svg2" fill={stroke2}/>
        </div>
        <div className="arrow">
          <div className="arrow-cover"></div>
        </div>
      </div>
      <div className="configurator-step step-3">
        <div className="configurator-step-text">
          <div>
            Step 
            <br></br>
            <span>3</span>
          </div>
          <Svg8 className="svg svg3" fill={stroke3}/>
        </div>
        <div className="arrow">
          <div className="arrow-cover"></div>
        </div>
      </div>
      <div className="configurator-step step-4">
        <div className="configurator-step-text">
          <div>
            Step 
            <br></br>
            <span>4</span>
          </div>
        </div>
        <div className="arrow">
          <div className="arrow-cover"></div>
        </div>
      </div>
      <div className="configurator-step step-5">
        <div className="configurator-step-text">
          <div>
            Step 
            <br></br>
            <span>5</span>
          </div>
          <Svg5 className="svg svg5" fill={stroke5}/>
        </div>
        <div className="arrow">
          <div className="arrow-cover"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;