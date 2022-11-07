import { useEffect } from "react";
import { scene } from "../CanvasElement.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { getBed } from "./Step1.js";
import * as THREE from 'three'
import pootS from "../../assets/legs/STANDAARD.JPG"
import pootA from "../../assets/legs/101_POOT_A.JPG"
import pootB from "../../assets/legs/101_POOT_B_ALU.JPG"
import pootC from "../../assets/legs/101_POOT_CDZ.JPG"
import pootD from "../../assets/legs/101_POOT_DZ.JPG"
import pootE from "../../assets/legs/101_POOT_EO_ZWART.JPG"

let legURLs

const Step3 = (props) => {
  useEffect(() => {

  })

  //the arrray all elements get renedered in
  let legs = [];

  let pictures = [pootS, pootA, pootB, pootC, pootD, pootE]

  legs.push(
    <div className="checkbox active" id={"leg0"} key={0}>
      <img className="checkbox-img"  alt="error loading img" src={pootS}></img>
      <div className="checkbox-checker"></div>
    </div>
  )

  //all the lecations of the glb models of the legs

  legURLs = [null, "legs/101_POOT_A.glb", "legs/101_POOT_B_ALU.glb", "legs/101_POOT_CDZ.glb", "legs/101_POOT_DZ.glb", "legs/101_POOT_EO_ZWART.glb"]

  for (let i = 1; i < legURLs.length ; i++) {
    legs.push(
      <div className="checkbox" id={"leg" + i} key={i}>
        <img className="checkbox-img"  alt="error loading img" src={pictures[i]} onClick={() => {

          console.log("the legs are active output: " + !(sessionStorage.getItem("currentLeg") === legURLs[i]))
          //check if the leg is already the active one
          if (!(sessionStorage.getItem("currentLeg") === legURLs[i])) {
            //remove the other leg
            removeAllLegs();

            //load the new selected leg
            loadLegs(legURLs[i])

            //store in the session storage which leg is the new one
            sessionStorage.setItem("currentLeg", legURLs[i])
          }
        }} ></img>
        <div className="checkbox-checker"></div>
      </div>
    )
  }


  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">3</p>
        </div>
        <p className="title">
          LEGS
        </p>
      </div>
      <div className="step-container">
        <div className="selection-container">
          <p className="title">LEGS</p>
          <div className="checkbox-container">
            {legs}
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(2)}}> previous </button>
          <button className="next-button" onClick={() => {props.setSteps(4)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

const removeAllLegs = () => {
  let otherLeg = findOtherLegs()
  if (otherLeg) {
    otherLeg.removeFromParent();
    scene.remove(otherLeg)
  }
  else {
    console.log("There where no legs in the scene")
  }
}

const findOtherLegs = () => {
  for (let i = 1; i < legURLs.length; i++) {
    let legs = scene.getObjectByName( legURLs[i] );
    if (legs) return legs
  }

  let bed = getBed(scene)
  if (bed.legs) return bed.legs

  console.log("ERROR: No legs found")
}

const loadLegs = (url) => {
  const loader = new GLTFLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
  loader.setDRACOLoader( dracoLoader );

  // Load a glTF resource
  loader.load(
  	// resource URL
	  url,
	  // called when the resource is loaded
  	function ( gltf ) {
      gltf.scene.scale.set(0.001, 0.0018, 0.001)
      let leg2 = gltf.scene.clone()
      let leg3 = gltf.scene.clone()
      let leg4 = gltf.scene.clone()

      gltf.scene.position.set(.91, .18, 1.02)
      leg2.position.set(-.91, .18, 1.02)
      leg3.position.set(.91, .18, -1.02)
      leg4.position.set(-.91, .18, -1.02)
      
      leg3.rotation.y = Math.PI
      leg4.rotation.y = Math.PI

      if (url === "legs/101_POOT_DZ.glb") {
        leg2.rotation.y = Math.PI
        leg3.rotation.y = 0
      }
      else if (url === "legs/101_POOT_EO_ZWART.glb") {
        gltf.scene.rotation.y = Math.PI / 2
        leg2.rotation.y = Math.PI / 2
        leg3.rotation.y = Math.PI / 2 * 3
        leg4.rotation.y = Math.PI / 2 * 3
      }

      
      let newLegs = new THREE.Group()
      newLegs.add(gltf.scene)
      newLegs.add(leg2)
      newLegs.add(leg3)
      newLegs.add(leg4)

      scene.add(newLegs)

      newLegs.name = url

      return newLegs
    },
	  // called while loading is progressing
    function ( xhr ) {
		  console.log( xhr.loaded + ' loaded' );
	  },
	  // called when loading has errors
    function ( error ) {
	    console.log( error );
	  }
  );
}

export default Step3