import { scene } from "../CanvasElement.js";
import textures from "./Backboard-textures"
import { getBed } from "./Step1.js";
import * as THREE from "three"

const Step2 = (props) => {
  let checkboxes = [];
  for (let texture of textures) {
    checkboxes.push(
      <div className="checkbox" id={texture.Id} key={texture.Name} onClick={() => {
        let bed = getBed(scene)
        console.log(bed.onlyFrame)

        let material = new THREE.MeshStandardMaterial({ color: 0xff00ff})
        bed.onlyFrame.material = material
      }}>
        <img className="checkbox-img"  alt="error loading img" src={texture.Img}></img>
        <div className="checkbox-checker"></div>
      </div>
    );
  }

  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">2</p>
        </div>
        <p className="title">
          STOF
        </p>
      </div>
      <div className="step-container">
        <div className="selection-container">
          <p className="title">TEXTURE</p>
          <div className="checkbox-container">
            {checkboxes}
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(1)}}> previous </button>
          <button className="next-button" onClick={() => {props.setSteps(3)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export default Step2