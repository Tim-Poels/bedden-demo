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

import littleBlanketColor from "../../assets/textures/Color/littleBlanket.jpg"
import littleBlanketNormal from "../../assets/textures/Normal/littleBlanket.jpg"
import littleBlanketRoughness from "../../assets/textures/Roughness/littleBlanket.jpg"

import matresColor from "../../assets/textures/Color/matres.jpg"
import matresNormal from "../../assets/textures/Normal/matres.jpg"
import matresRoughness from "../../assets/textures/Roughness/matres.jpg"

import bigBlanketColor from "../../assets/textures/Color/bigBlanket.jpg"
import bigBlanketNormal from "../../assets/textures/Normal/bigBlanket.jpg"
import bigBlanketRoughness from "../../assets/textures/Roughness/bigBlanket.jpg"

import middlePillowColor from "../../assets/textures/Color/middlePillow.jpg"
import middlePillowNormal from "../../assets/textures/Normal/middlePillow.jpg"
import middlePillowRoughness from "../../assets/textures/Roughness/middlePillow.jpg"

import outsidePillowsColor from "../../assets/textures/Color/outsidePillows.jpg"
import outsidePillowsNormal from "../../assets/textures/Normal/outsidePillows.jpg"
import outsidePillowsRoughness from "../../assets/textures/Roughness/outsidePillows.jpg"

import { scene } from "../CanvasElement.js"
import * as THREE from "three"
import { getBed } from "./Step1.js"

const textures = [
  {
    Id: 0,
    Name: "red-test",
    Img: redImg, 
    AO: redAO,
    Color: redColor,
    Normal: redNormal,
    Roughness: redRoughness,
  },
  {
    Id: 1,
    Name: "white-test",
    Img: whiteImg, 
    AO: whiteAO,
    Color: whiteColor,
    Normal: whiteNormal,
    Roughness: whiteRoughness,
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

  let index = 0 // Index of the texture that you want loaded when there is no texture in the sessionStorage

  let sessionTexture = sessionStorage.getItem("texture");

  if (sessionTexture) {
    switch (sessionTexture) {
      case "red-test":
        index = 0;
        break;
      case "white-test":
        index = 1;
        break;
      case "orange-test":
        index = 2;
        break;
      case "yellow-test":
        index = 3;
        break;
      default: 
        index = 0;
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

  let frameColor = textureLoader.load( textures[index].Color );
  frameColor.wrapS = THREE.RepeatWrapping;
  frameColor.wrapT = THREE.RepeatWrapping;
  // roughness.repeat.set( 2, 2 );
        
  let frameNormal = textureLoader.load( textures[index].Normal );
  frameNormal.wrapS = THREE.RepeatWrapping;
  frameNormal.wrapT = THREE.RepeatWrapping;
  // normal.repeat.set( 2, 2 );

  let frameRoughness = textureLoader.load( textures[index].Roughness );
  frameRoughness.wrapS = THREE.RepeatWrapping;
  frameRoughness.wrapT = THREE.RepeatWrapping;
  // roughness.repeat.set( 2, 2 );

  let frameAO = textureLoader.load( textures[index].AO );
  frameAO.wrapS = THREE.RepeatWrapping;
  frameAO.wrapT = THREE.RepeatWrapping;
  // roughness.repeat.set( 2, 2 );

  let frameMaterial = new THREE.MeshStandardMaterial({ 
    map: frameColor,
    normalMap: frameNormal,
    roughnessMap: frameRoughness,
    aoMap: frameAO,
  })

  bed.onlyFrame.material = frameMaterial

  let littleBlanketColorMap = textureLoader.load( littleBlanketColor )
  littleBlanketColorMap.wrapS = THREE.RepeatWrapping;
  littleBlanketColorMap.wrapT = THREE.RepeatWrapping;
  littleBlanketColorMap.repeat.set(2, 2);

  let littleBlanketRoughnessMap = textureLoader.load( littleBlanketRoughness )
  littleBlanketRoughnessMap.wrapS = THREE.RepeatWrapping;
  littleBlanketRoughnessMap.wrapT = THREE.RepeatWrapping;
  littleBlanketRoughnessMap.repeat.set(2, 2);

  let littleBlanketNormalMap = textureLoader.load( littleBlanketNormal )
  littleBlanketNormalMap.wrapS = THREE.RepeatWrapping;
  littleBlanketNormalMap.wrapT = THREE.RepeatWrapping;
  littleBlanketNormalMap.repeat.set(2, 2);

  let littleBlanketMaterial = new THREE.MeshStandardMaterial({ 
    map: littleBlanketColorMap,
    normalMap: littleBlanketNormalMap,
    roughnessMap: littleBlanketRoughnessMap,
  })

  bed.smallBlanket.material = littleBlanketMaterial

  let matresColorMap = textureLoader.load( matresColor )
  matresColorMap.wrapS = THREE.RepeatWrapping;
  matresColorMap.wrapT = THREE.RepeatWrapping;
  matresColorMap.repeat.set(4, 4);

  let matresRoughnessMap = textureLoader.load( matresRoughness )
  matresRoughnessMap.wrapS = THREE.RepeatWrapping;
  matresRoughnessMap.wrapT = THREE.RepeatWrapping;
  matresRoughnessMap.repeat.set(4, 4);

  let matresNormalMap = textureLoader.load( matresNormal )
  matresNormalMap.wrapS = THREE.RepeatWrapping;
  matresNormalMap.wrapT = THREE.RepeatWrapping;
  matresNormalMap.repeat.set(4, 4);

  let matresMaterial = new THREE.MeshStandardMaterial({ 
    map: matresColorMap,
    normalMap: matresNormalMap,
    roughnessMap: matresRoughnessMap,
  })

  bed.matres.material = matresMaterial

  bed.middlePillow.material = matresMaterial

  bed.longPillow.material = matresMaterial

  bed.outsidePillows.material = matresMaterial

  let bigBlanketColorMap = textureLoader.load( bigBlanketColor )
  bigBlanketColorMap.wrapS = THREE.RepeatWrapping;
  bigBlanketColorMap.wrapT = THREE.RepeatWrapping;
  bigBlanketColorMap.repeat.set(0.5, 0.5);

  let bigBlanketRoughnessMap = textureLoader.load( bigBlanketRoughness )
  bigBlanketRoughnessMap.wrapS = THREE.RepeatWrapping;
  bigBlanketRoughnessMap.wrapT = THREE.RepeatWrapping;
  bigBlanketRoughnessMap.repeat.set(0.5, 0.5);

  let bigBlanketNormalMap = textureLoader.load( bigBlanketNormal )
  bigBlanketNormalMap.wrapS = THREE.RepeatWrapping;
  bigBlanketNormalMap.wrapT = THREE.RepeatWrapping;
  bigBlanketNormalMap.repeat.set(0.5, 0.5);

  let bigBlanketMaterial = new THREE.MeshStandardMaterial({ 
    map: bigBlanketColorMap,
    normalMap: bigBlanketNormalMap,
    roughnessMap: bigBlanketRoughnessMap,
    roughness: 1
  })

  bed.bigBlanket.material = bigBlanketMaterial

  let middlePillowColorMap = textureLoader.load( middlePillowColor )
  middlePillowColorMap.wrapS = THREE.RepeatWrapping;
  middlePillowColorMap.wrapT = THREE.RepeatWrapping;
  middlePillowColorMap.repeat.set(1.5, 1.5);

  let middlePillowRoughnessMap = textureLoader.load( middlePillowRoughness )
  middlePillowRoughnessMap.wrapS = THREE.RepeatWrapping;
  middlePillowRoughnessMap.wrapT = THREE.RepeatWrapping;
  middlePillowRoughnessMap.repeat.set(1.5, 1.5);

  let middlePillowNormalMap = textureLoader.load( middlePillowNormal )
  middlePillowNormalMap.wrapS = THREE.RepeatWrapping;
  middlePillowNormalMap.wrapT = THREE.RepeatWrapping;
  middlePillowNormalMap.repeat.set(1.5, 1.5);

  let middlePillowMaterial = new THREE.MeshStandardMaterial({ 
    map: middlePillowColorMap,
    normalMap: middlePillowNormalMap,
    roughnessMap: middlePillowRoughnessMap,
  })

  bed.middlePillow.material = middlePillowMaterial

  let outsidePillowsColorMap = textureLoader.load( outsidePillowsColor )
  outsidePillowsColorMap.wrapS = THREE.RepeatWrapping;
  outsidePillowsColorMap.wrapT = THREE.RepeatWrapping;
  outsidePillowsColorMap.repeat.set(2.5, 2.5);

  let outsidePillowsRoughnessMap = textureLoader.load( outsidePillowsRoughness )
  middlePillowRoughnessMap.wrapS = THREE.RepeatWrapping;
  middlePillowRoughnessMap.wrapT = THREE.RepeatWrapping;
  middlePillowRoughnessMap.repeat.set(2.5, 2.5);

  let outsidePillowsNormalMap = textureLoader.load( outsidePillowsNormal )
  outsidePillowsNormalMap.wrapS = THREE.RepeatWrapping;
  outsidePillowsNormalMap.wrapT = THREE.RepeatWrapping;
  outsidePillowsNormalMap.repeat.set(2.5, 2.5);

  let outsidePillowsMaterial = new THREE.MeshStandardMaterial({ 
    map: outsidePillowsColorMap,
    normalMap: outsidePillowsNormalMap,
    roughnessMap: outsidePillowsRoughnessMap,
    roughness: 1,
  })

  bed.outsidePillows.material = outsidePillowsMaterial
}

export default textures