import { useEffect } from "react";
import { scene } from "../CanvasElement.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { getBed } from "./Step1.js";
import * as THREE from 'three'

import placeholder from "../../assets/textures/Color/red-test.jpg"

const Step3 = (props) => {
  useEffect(() => {
    let bed = getBed(scene)
    bed.legs.removeFromParent();
    scene.remove(bed.legs)
    let newLegs = loadLegs("legs/101_POOT_A.glb")
  })

  let legs = []

  for (let i = 0; i < 12; i++) {
    legs.push(
      <div className="checkbox" id={"leg" + i} key={i}>
        <img className="checkbox-img"  alt="error loading img" src={placeholder}></img>
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
      gltf.scene.scale.set(0.001, 0.002, 0.001)
      let leg2 = gltf.scene.clone()
      let leg3 = gltf.scene.clone()
      let leg4 = gltf.scene.clone()
      gltf.scene.position.set(.91, .2, 1.02)
      leg2.position.set(-.91, .2, 1.02)
      leg3.position.set(.91, .2, -1.02)
      leg4.position.set(-.91, .2, -1.02)
      
      let newLegs = new THREE.Group()
      newLegs.add(gltf.scene)
      newLegs.add(leg2)
      newLegs.add(leg3)
      newLegs.add(leg4)

      scene.add(newLegs)
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