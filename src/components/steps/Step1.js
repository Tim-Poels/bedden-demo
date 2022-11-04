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
          // Creates an object that includes the elements of the bed under associating names
          let bed = getBed(scene)

          // Creating a scale factor that scales it so that the bed is the exact right size
          let scaleAdjust = newWidth / currentWidth
          bed.full.scale.x *= scaleAdjust 

          // Scales thepillows so they stay the same size (get's scaled up when the whole model does, and then scaled down sepperatly with the same factor)
          bed.middlePillow.scale.x /= scaleAdjust
          bed.outsidePillows.scale.x /= scaleAdjust
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
          // Creates an object that includes the elements of the bed under associating names
          let bed = getBed(scene)
          
          // Creating a scale factor that scales it so that the bed is the exact right size
          let scaleAdjust = newLength / currentLength
          
          bed.full.scale.z *= scaleAdjust 
          
          // Scales thepillows so they stay the same size (get's scaled up when the whole model does, and then scaled down sepperatly with the same factor)
          bed.middlePillow.scale.z /= scaleAdjust
          bed.outsidePillows.scale.z /= scaleAdjust
          bed.smallBlanket.scale.z /= scaleAdjust
          bed.bigBlanket.scale.z /= scaleAdjust

          //positions the blankets on relatively the same place on the bed so that it doesn't seem stretched (100 waw what I calculated the position change to be but there was a little clipping so I changed it to 90)
          if (scaleAdjust < 1) {
            bed.bigBlanket.position.z -= 90
            bed.smallBlanket.position.z -= 90
          }
          else if (scaleAdjust > 1) {
            bed.bigBlanket.position.z += 90
            bed.smallBlanket.position.z += 90
          }
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
                    defaultValue={220}
                    getAriaValueText={changeCurrentLength}
                    step={10}
                    min={200}
                    max={250}
                    valueLabelDisplay="auto"
                    // marks={true}
                  />
                </div>
              </div>
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button greyed-out-button"> previous </button>
          <button className="next-button" onClick={() => {
            props.setSteps(2)
          }}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export const getBed = (scene) => {
  let bed = scene.children[4].children[0]
  let obj = {
    full: bed
  } 

  for (let c of bed.children) {
    if (c.name === "Bed_01012") {
      obj.frame = c
      for (let d of obj.frame.children) {
        if (d.name === "Mesh010") {
          obj.onlyFrame = d
        }
      }
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01013") {
      obj.legs = c
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01014") {
      obj.middlePillow = c
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01015") {
      obj.matres = c
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01016") {
      obj.bigBlanket = c
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01017") {
      obj.smallBlanket = c
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01018") {
      obj.outsidePillows = c
    }
  }

  for (let c of bed.children) {
    if (c.name === "Bed_01019") {
      obj.longPillow = c
    }
  }

  return obj
}

export default Step1;