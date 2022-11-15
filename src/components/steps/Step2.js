import { scene } from "../CanvasElement.js";
import textures from "./Textures.js"
import { getBed } from "./Step1.js";
import * as THREE from "three"
import { useEffect, useState } from "react"
import priceCalculator from "./priceCalculator.js"

const Step2 = (props) => {
  useEffect(() => {
    let checks = document.getElementsByClassName("checkbox")
    for (let elem of checks) {
      if (elem.classList.contains("active")) {
        elem.classList.remove("active");
      }
    }
    console.log(useTexture)
    let active = document.getElementById(useTexture)

    sessionStorage.setItem("texture", useTexture);

    document.getElementById("price").innerText = priceCalculator().total + "€"

    active.classList.add("active")
  })

  let textureName    
  if (sessionStorage.getItem("texture")) {
    textureName = sessionStorage.getItem("texture")
  }
  else {
    textureName = "red-test"
  }
  console.log(textureName)
  const [useTexture, setTexture] = useState(textureName)
  
  const textureLoader = new THREE.TextureLoader()

  let checkboxes = [];
  for (let texture of textures) {
    checkboxes.push(
      <div className="checkbox" id={texture.Name} key={texture.Name} onClick={() => {
        let bed = getBed(scene)

        let color = textureLoader.load( texture.Color );
        color.wrapS = THREE.RepeatWrapping;
        color.wrapT = THREE.RepeatWrapping;
        // roughness.repeat.set( 2, 2 );
        
        let normal = textureLoader.load( texture.Normal );
        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.RepeatWrapping;
        // normal.repeat.set( 2, 2 );

        let roughness = textureLoader.load( texture.Roughness );
        roughness.wrapS = THREE.RepeatWrapping;
        roughness.wrapT = THREE.RepeatWrapping;
        // roughness.repeat.set( 2, 2 );

        let AO = textureLoader.load( texture.AO );
        AO.wrapS = THREE.RepeatWrapping;
        AO.wrapT = THREE.RepeatWrapping;
        // roughness.repeat.set( 2, 2 );

        let material = new THREE.MeshStandardMaterial({ 
          map: color,
          normalMap: normal,
          roughnessMap: roughness,
          aoMap: AO,
          
        })
        bed.onlyFrame.material.dispose()
        bed.onlyFrame.material = material

        setTexture(texture.Name)
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
          FABRIC
        </p>
      </div>
      <div className="step-container">
        <div className="selection-container">
          <p className="title">FABRIC</p>
          <div className="checkbox-container">
            {checkboxes}
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(1)}}> previous </button>
          <p id="price">placeholder</p>
          <button className="next-button" onClick={() => {props.setSteps(3)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export default Step2