import "./SelectorElement.css"
import "./steps/Steps.css"
import Step1 from "./steps/Step1.js"
import Step2 from "./steps/Step2.js"	
import Step3 from "./steps/Step3.js"
import Step4 from "./steps/Step4.js"
import { useEffect } from "react"

const SelectorElement = (props) => {
  useEffect(() => {
    if (props.useSteps == null) {
      console.log("useSteps is null")
      props.setSteps(1)
    }
  })
  let renderedStep;
  switch (props.useSteps) {
    case 1: 
      renderedStep = <Step1 setSteps={props.setSteps}/>
      break;
    case 2: 
      renderedStep = <Step2 setSteps={props.setSteps}/>
      break;
    case 3: 
      renderedStep = <Step3 setSteps={props.setSteps}/>
      break;
    case 4: 
      renderedStep = <Step4 setSteps={props.setSteps}/>
      break;
    case 5: 
      // renderedStep = <Step5 setSteps={props.setSteps}/>
      break;
    default: 
      renderedStep = <Step1 setSteps={props.setSteps}/>
  }
  return (
    <div className="SelectorElement">
      {renderedStep}
    </div>
  );
}

export default SelectorElement;