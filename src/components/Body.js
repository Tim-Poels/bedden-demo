import "./Body.css"
import { CanvasElement, scene } from "./CanvasElement.js"
import SelectorElement from "./SelectorElement.js";
import { useEffect } from "react";
import { getBed } from "./steps/Step1.js";

const Body = (props) => {
  useEffect(() => {
    // if (scene) {
    //   let bed = getBed(scene)
    //   if (bed) {
    //     bed.full.position.set(0, 0, 0)
    //     bed.full.rotation.set(0, 0, 0)
    //     bed.full.scale.set(1, 1, 1)
    //   }
    // }
  })
  return (
    <div className="Body">
      {/* <button onClick={() => { props.setSteps(1) }}> change to step 1 </button>
      <button onClick={() => { props.setSteps(2) }}> change to step 2 </button>
      <button onClick={() => { props.setSteps(3) }}> change to step 3 </button>
      <button onClick={() => { props.setSteps(4) }}> change to step 4 </button>
      <button onClick={() => { props.setSteps(5) }}> change to step 5 </button> */}
      <CanvasElement />
      <SelectorElement setSteps={props.setSteps} useSteps={props.useSteps} />
    </div>
  );
}

export default Body;