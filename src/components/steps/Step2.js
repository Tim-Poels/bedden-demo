import { scene } from "../CanvasElement.js";
import textures from "./Textures.js"
import { getBed } from "./Step1.js";
import * as THREE from "three"
import { useEffect, useState } from "react"

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

    active.classList.add("active")
  })

  const [useTexture, setTexture] = useState("red-test")

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