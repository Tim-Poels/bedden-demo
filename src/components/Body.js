import "./Body.css"
import { CanvasElement } from "./CanvasElement.js"
import SelectorElement from "./SelectorElement.js";

const Body = (props) => {
  return (
    <div className="Body">
      <CanvasElement />
      <SelectorElement setSteps={props.setSteps} useSteps={props.useSteps} />
    </div>
  );
}

export default Body;