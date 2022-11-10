import whiteAO from "../../assets/textures/AO/white-test.jpg"
import whiteColor from "../../assets/textures/Color/white-test.jpg"
import whiteNormal from "../../assets/textures/Normal/white-test.jpg"
import whiteRoughness from "../../assets/textures/Roughness/white-test.jpg"
import whiteImg from "../../assets/textures/Cover/white-test.jpg"

import redAO from "../../assets/textures/AO/red-test.jpg"
import redColor from "../../assets/textures/Color/red-test.jpg"
import redNormal from "../../assets/textures/Normal/red-test.jpg"
import redRoughness from "../../assets/textures/Roughness/red-test.jpg"
import redImg from "../../assets/textures/Cover/red-test.jpg"

import orangeAO from "../../assets/textures/AO/orange-test.jpg"
import orangeColor from "../../assets/textures/Color/orange-test.jpg"
import orangeNormal from "../../assets/textures/Normal/orange-test.jpg"
import orangeRoughness from "../../assets/textures/Roughness/orange-test.jpg"
import orangeImg from "../../assets/textures/Cover/orange-test.jpg"

import yellowAO from "../../assets/textures/AO/yellow-test.jpg"
import yellowColor from "../../assets/textures/Color/yellow-test.jpg"
import yellowNormal from "../../assets/textures/Normal/yellow-test.jpg"
import yellowRoughness from "../../assets/textures/Roughness/yellow-test.jpg"
import yellowImg from "../../assets/textures/Cover/yellow-test.jpg"

import { scene } from "../CanvasElement.js"
import * as THREE from "three"
import { getBed } from "./Step1.js"

const textures = [
  {
    Id: 0,
    Name: "white-test",
    Img: whiteImg, 
    AO: whiteAO,
    Color: whiteColor,
    Normal: whiteNormal,
    Roughness: whiteRoughness,
  },
  {
    Id: 1,
    Name: "red-test",
    Img: redImg, 
    AO: redAO,
    Color: redColor,
    Normal: redNormal,
    Roughness: redRoughness,
  },
  {
    Id: 2,
    Name: "orange-test",
    Img: orangeImg, 
    AO: orangeAO,
    Color: orangeColor,
    Normal: orangeNormal,
    Roughness: orangeRoughness,
  },
  {
    Id: 3,
    Name: "yellow-test",
    Img: yellowImg, 
    AO: yellowAO,
    Color: yellowColor,
    Normal: yellowNormal,
    Roughness: yellowRoughness,
  },
];

export const addTexture = () => {
  const textureLoader = new THREE.TextureLoader()

  let index = 1 // Index of the texture that you want loaded when there is no texture in the sessionStorage

  let sessionTexture = sessionStorage.getItem("texture");

  if (sessionTexture) {
    switch (sessionTexture) {
      case "white-test":
        index = 0;
        break;
      case "red-test":
        index = 1;
        break;
      case "orange-test":
        index = 2;
        break;
      case "yellow-test":
        index = 3;
        break;
      default: 
        index = 1;
        sessionStorage.setItem("texture", "red-test");
        break;
    }
  }
  else {
    sessionStorage.setItem("texture", "red-test");
  }


  let bed = getBed(scene)

  if(!bed) {
    console.log("ERROR: no bed found at addTexture()")
    return null
  }

  let color = textureLoader.load( textures[index].Color );
  color.wrapS = THREE.RepeatWrapping;
  color.wrapT = THREE.RepeatWrapping;
  // roughness.repeat.set( 2, 2 );
        
  let normal = textureLoader.load( textures[index].Normal );
  normal.wrapS = THREE.RepeatWrapping;
  normal.wrapT = THREE.RepeatWrapping;
  // normal.repeat.set( 2, 2 );

  let roughness = textureLoader.load( textures[index].Roughness );
  roughness.wrapS = THREE.RepeatWrapping;
  roughness.wrapT = THREE.RepeatWrapping;
  // roughness.repeat.set( 2, 2 );

  let AO = textureLoader.load( textures[index].AO );
  AO.wrapS = THREE.RepeatWrapping;
  AO.wrapT = THREE.RepeatWrapping;
  // roughness.repeat.set( 2, 2 );

  let material = new THREE.MeshStandardMaterial({ 
    map: color,
    normalMap: normal,
    roughnessMap: roughness,
    aoMap: AO,
  })

  bed.onlyFrame.material = material
}

export default textures