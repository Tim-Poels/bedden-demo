import "./SelectorElement.css"
import "./steps/Steps.css"
import Step1 from "./steps/Step1.js"

const SelectorElement = (props) => {
  let renderedStep;
  console.log(props.useSteps)
  switch (props.useSteps) {
    case 1: 
      renderedStep = <Step1 setSteps={props.setSteps}/>
      break;
    case 2: 
      // renderedStep = <Step2 setSteps={props.setSteps}/>
      break;
    case 3: 
      // renderedStep = <Step3 setSteps={props.setSteps}/>
      break;
    case 4: 
      // renderedStep = <Step4 setSteps={props.setSteps}/>
      break;
    case 5: 
      // renderedStep = <Step5 setSteps={props.setSteps}/>
      break;
    default: console.log(`Step ${props.useSteps} doesn't exist (yet)`)
  }
  return (
    <div className="SelectorElement">
      {renderedStep}
    </div>
  );
}

export default SelectorElement;