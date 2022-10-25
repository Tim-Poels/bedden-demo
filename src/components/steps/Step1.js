import { useEffect } from "react";
import { scene } from "../CanvasElement.js";
import Slider from '@mui/material/Slider';

const Step1 = (props) => {
  useEffect(() => {
    // console.log(scene)
  })
  let currentWidth;
  const changeCurrentWidth = (newWidth) => {
    if (currentWidth !== newWidth) {
      currentWidth = newWidth
      console.log("width changed to " + currentWidth)
      if (scene) {
        if (scene.children[4]) {
          scene.children[4].scale.set(currentWidth / 200, 1, 1)
        }
        else {
          console.log("error: bed hasn't loaded yet")
        }
      }
      else {
        console.log("error: scene doesn't exist yet")
      }
    }
  }
  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">1</p>
        </div>
        <p className="title">
          BOXSPRING
        </p>
      </div>
      <div className="step-container">
        <div className="selection-container">
          <p className="title">SIZE</p>
          <div className="slider-container">
            <div className="single-slider">
              <div className="name">Width</div>
              <div className="slider">
                <Slider
                  aria-label="Custom marks"
                  defaultValue={200}
                  getAriaValueText={changeCurrentWidth}
                  step={20}
                  min={180}
                  max={240}
                  valueLabelDisplay="auto"
                  // marks={true}
                />
              </div>
            </div>
            <div className="single-slider">
              <div className="name">Height</div>
              <div className="slider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1;