import { useEffect } from "react";
import { scene } from "../CanvasElement.js";
import Slider from '@mui/material/Slider';

const Step1 = (props) => {
  useEffect(() => {
    // console.log(scene)
  })

  // scene.children[4].children[0] is the full bed group
  // bed.children[0] are the legs
  // bed.children[1] is the middle pillow
  // bed.children[2] is the top blanket 
  // bed.children[3] is the long underlying pillow
  // bed.children[4] is the bed frame group
  // bed.children[5] is the matrres
  // bed.children[6] is the bottom blanket
  // bed.children[7] are the 2 headpillows

  let currentWidth;
  let currentLength;

  const changeCurrentWidth = (newWidth) => {
    if (currentWidth !== newWidth) {
      
      console.log("width changed to " + currentWidth)

      if (scene) {
        if (scene.children[4]) {
          let bed = scene.children[4].children[0]
          // Creating a scale factor that scales it so that the bed is the exact right size
          let scaleAdjust = newWidth / currentWidth
          bed.scale.x *= scaleAdjust 
          // Scales thepillows so they stay the same size (get's scaled up when the whole model does, and then scaled down sepperatly with the same factor)
          bed.children[1].scale.x /= scaleAdjust
          bed.children[7].scale.x /= scaleAdjust
        }
        else {
          console.log("error: bed hasn't loaded yet")
        }
      }
      else {
        console.log("error: scene doesn't exist yet")
      }
    }
    currentWidth = newWidth
  }

  const changeCurrentLength = (newLength) => {
    if (currentLength !== newLength) {
      
      console.log("width changed to " + currentLength)
      if (scene) {
        if (scene.children[4]) {
          let bed = scene.children[4].children[0]
          // Creating a scale factor that scales it so that the bed is the exact right size
          let scaleAdjust = newLength / currentLength
          bed.scale.z *= scaleAdjust 
          // Scales thepillows so they stay the same size (get's scaled up when the whole model does, and then scaled down sepperatly with the same factor)
          bed.children[1].scale.z /= scaleAdjust
          bed.children[7].scale.z /= scaleAdjust
        }
        else {
          console.log("error: bed hasn't loaded yet")
        }
      }
      else {
        console.log("error: scene doesn't exist yet")
      }
      currentLength = newLength
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
          </div>
          <div className="slider-container">
              <div className="single-slider">
                <div className="name">Length</div>
                <div className="slider">
                 <Slider
                    aria-label="Custom marks"
                    defaultValue={200}
                    getAriaValueText={changeCurrentLength}
                    step={20}
                    min={180}
                    max={240}
                    valueLabelDisplay="auto"
                    // marks={true}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1;