import "./Body.css"
import CanvasElement from "./CanvasElement.js";
import SelectorElement from "./SelectorElement.js";

const Body = (props) => {
  return (
    <div className="Body">
      {/* <button onClick={() => { props.setSteps(1) }}> change to step 1 </button>
      <button onClick={() => { props.setSteps(2) }}> change to step 2 </button>
      <button onClick={() => { props.setSteps(3) }}> change to step 3 </button>
      <button onClick={() => { props.setSteps(4) }}> change to step 4 </button>
      <button onClick={() => { props.setSteps(5) }}> change to step 5 </button> */}
      <CanvasElement />
      <SelectorElement setSteps={props.setSteps} useSteps={props.useSteps}/>
    </div>
  );
}

export default Body;