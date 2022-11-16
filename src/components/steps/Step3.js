import { useEffect, useState } from "react";
import { scene } from "../CanvasElement.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'
import priceCalculator from "./priceCalculator.js"

import pootA from "../../assets/legs/101_POOT_A.JPG"
import pootB from "../../assets/legs/101_POOT_B_ALU.JPG"
import pootC from "../../assets/legs/101_POOT_CDZ.JPG"
import pootD from "../../assets/legs/101_POOT_DZ.JPG"
import pootE from "../../assets/legs/101_POOT_EO_ZWART.JPG"

import blackSteel from "../../assets/legs/colors/covers/blackSteel.jpg"
import whiteSteel from "../../assets/legs/colors/covers/whiteSteel.jpg"
import lightSteel from "../../assets/legs/colors/covers/lightSteel.jpg"
import darkSteel from "../../assets/legs/colors/covers/darkSteel.jpg"

let legURLs = ["legs/101_POOT_A.glb", "legs/101_POOT_B_ALU.glb", "legs/101_POOT_CDZ.glb", "legs/101_POOT_DZ.glb", "legs/101_POOT_EO_ZWART.glb"];
let colorMaterials = []

const Step3 = (props) => {
  useEffect(() => {
    //check the right checkboxes
    let checks = document.getElementsByClassName("checkbox")
    for (let elem of checks) {
      if (elem.classList.contains("active")) {
        elem.classList.remove("active");
      }
    }
    let active = document.getElementById(useCurrentLeg)

    active.classList.add("active")

    let activeTexture = document.getElementById(useCurrentLegTexture)

    activeTexture.classList.add("active")

    document.getElementById("price").innerText = priceCalculator().total + "€"
  })

  const [useCurrentLeg, setCurrentLeg] = useState(sessionStorage.getItem("currentLeg"))

  const [useCurrentLegTexture, setCurrentLegTexture] = useState(sessionStorage.getItem("currentLegTexture"))

  //the arrray all elements get renedered in
  let legs = [];

  let pictures = [pootA, pootB, pootC, pootD, pootE]
  
  //all the locations of the glb models of the legs
  for (let i = 0; i < legURLs.length ; i++) {
    legs.push(
      <div className="checkbox" id={legURLs[i]} key={i}>
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
            
            document.getElementById("price").innerText = priceCalculator().total + "€"

            setCurrentLeg(legURLs[i])
          }
        }} ></img>
        <div className="checkbox-checker"></div>
      </div>
    )
  }
  
  let colors = []
  
  let colorCovers = [blackSteel, whiteSteel, lightSteel, darkSteel]
  
  if (!colorMaterials[0]) {
    
  
    colorMaterials.push(
      new THREE.MeshStandardMaterial({ color: "black", roughness: 0.2, metalness: 0.85 }) // id: "legTexture0"
    )
  
    colorMaterials.push(
      new THREE.MeshStandardMaterial({ color: "white", roughness: 0.2 }) // id: "legTexture1"
    )
  
    colorMaterials.push(
      new THREE.MeshStandardMaterial({ color: "lightgray", roughness: 0.2 }) // id: "legTexture2"
    )
  
    colorMaterials.push(
      new THREE.MeshStandardMaterial({ color: "gray", roughness: 0.2 }) // id: "legTexture3"
    )
  }


  for (let i = 0; i < colorCovers.length; i++) {
    colors.push(
      <div className="checkbox" id={"legTexture" + i} key={i}>
        <img className="checkbox-img"  alt="error loading img" src={colorCovers[i]} onClick={() => {
          let leg = findOtherLegs()
          leg.traverse((mesh) => {
            if (mesh.isMesh) mesh.material = colorMaterials[i]
          })
          sessionStorage.setItem("currentLegTexture", "legTexture" + i)

          document.getElementById("price").innerText = priceCalculator().total + "€"

          setCurrentLegTexture("legTexture" + i)
          
        }}></img>
        <div className="checkbox-checker"></div>
      </div>
    )
  }


  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">Step</p>
          <p className="number">3</p>
        </div>
        <p className="title">
          LEGS
        </p>
      </div>
      <div className="step-container">
        <div className="selection-container">
          <p className="title">Model</p>
          <div className="checkbox-container">
            {legs}
          </div>

          <p className="title">Color</p>
          <div className="checkbox-container">
            {colors}
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(2)}}> Previous </button>
          <p id="price">placeholder</p>
          <button className="next-button" onClick={() => {props.setSteps(4)}}>Next</button>
        </div>
      </div>
    </div>
  )
}

export const removeAllLegs = () => {
  let otherLeg = findOtherLegs()
  if (otherLeg) {
    otherLeg.removeFromParent();
    scene.remove(otherLeg)
  }
  else {
    console.log("There where no legs in the scene")
  }
}

export const findOtherLegs = () => {
  for (let i = 0; i < legURLs.length; i++) {
    let legs = scene.getObjectByName( legURLs[i] );
    if (legs) return legs
  }
  console.log("ERROR: No legs found")
}

export const loadLegs = (url) => {
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

      newLegs.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true
          object.receiveShadow = true;
        }
      })

      let currentWidth = parseInt(sessionStorage.getItem("currentWidth"), 10)
      let currentLength = parseInt(sessionStorage.getItem("currentLength"), 10)

      newLegs.scale.x = currentWidth / 200
      newLegs.scale.z = currentLength / 220

      scene.add(newLegs)

      newLegs.name = url

      let num = 0;

      let texture = sessionStorage.getItem("currentLegTexture")
      if (texture) {
        num = texture.replace(/\D/g, '');
      }
      else {
        
        sessionStorage.setItem("currentLegTexture", "legTexture0")
      }

      if (!colorMaterials[num]) {
        colorMaterials.push(
          new THREE.MeshStandardMaterial({ color: "black", roughness: 0.2, metalness: 0.85 }) // id: "legTexture0"
        )

        colorMaterials.push(
          new THREE.MeshStandardMaterial({ color: "white", roughness: 0.2 }) // id: "legTexture1"
        )

        colorMaterials.push(
          new THREE.MeshStandardMaterial({ color: "lightgray", roughness: 0.2 }) // id: "legTexture2"
        )

        colorMaterials.push(
          new THREE.MeshStandardMaterial({ color: "gray", roughness: 0.2 }) // id: "legTexture3"
        )
      }
      
      newLegs.traverse((mesh) => {
        if (mesh.isMesh) mesh.material = colorMaterials[num]
      })
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