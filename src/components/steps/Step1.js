import { useEffect } from "react";
import { scene } from "../CanvasElement.js";
import priceCalculator from "./priceCalculator.js";
import { findOtherLegs } from "./Step3.js";

const Step1 = (props) => {
  useEffect(() => {
    let widthSlider = document.getElementById("widthSlider")
    widthSlider.value = currentWidth

    let lengthSlider = document.getElementById("lengthSlider")
    lengthSlider.value = currentLength

    document.getElementById("price").innerText = priceCalculator();
  })

  let currentWidth
  
  let sessionWidth = sessionStorage.getItem("currentWidth")
  if (sessionWidth) {
    currentWidth = parseInt(sessionWidth, 10)  }
  else {
    currentWidth = 200
    sessionStorage.setItem("currentWidth", 200)
  }

  let currentLength
  
  let sessionLength = sessionStorage.getItem("currentLength")
  if (sessionLength) {
    currentLength = parseInt(sessionLength, 10)
  }
  else {
    currentLength = 220
    sessionStorage.setItem("currentLength", 220)
  }


  const changeCurrentWidth = (newWidth) => {
    console.log(newWidth)
    if (!newWidth ) {
      console.log("width is undefined so no change")
      return null
    }
    if (currentWidth !== newWidth) {
      sessionStorage.setItem("currentWidth", newWidth)
      document.getElementById("price").innerText = priceCalculator();
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

          // Changing the legs
          let legs = findOtherLegs()
          for (let child of legs.children) {
            child.position.x *= scaleAdjust
          }
          
          currentWidth = newWidth
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

  const changeCurrentLength = (newLength) => {
    if (!newLength) {
      console.log("Length is undefined so no change")
      return null
    }
    if (currentLength !== newLength) {
      sessionStorage.setItem("currentLength", newLength)
      document.getElementById("price").innerText = priceCalculator();
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

          // Changing the legs
          let legs = findOtherLegs()
          for (let child of legs.children) {
            child.position.z *= scaleAdjust
          }
          
          currentLength = newLength
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
                <input type="range" id="widthSlider" min="180" max="240" step="20" className="bedAreaSlider" onChange={(x) => {
                  changeCurrentWidth(x.target.value)
                  document.getElementById("showWidth").innerText = x.target.value
                  }}></input>
                <p id="showWidth">{currentWidth}</p>
              </div>
            </div>
          </div>
          <div className="slider-container">
              <div className="single-slider">
                <div className="name">Length</div>
                <div className="slider">
                 <input type="range" min="180" max="240" step="10" id="lengthSlider" className="bedAreaSlider" onChange={(x) => {
                  changeCurrentLength(x.target.value)
                  document.getElementById("showLength").innerText = x.target.value
                  }}></input>
                <p id="showLength">{currentLength}</p>
                </div>
              </div>
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button greyed-out-button"> previous </button>
          <p id="price">placeholder</p>
          <button className="next-button" onClick={() => {
            props.setSteps(2)
          }}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export const getBed = (scene) => {
  let bed;
  scene.traverse((object) => {
    if (object.name === "Bed_01009") {
      bed = object
    }
  })

  if(!bed) {
    console.log("ERROR: no bed found at getBed()")
    return null
  }

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

  var legs = scene.getObjectByName("Bed_01013");
  if (legs) obj.legs = legs

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