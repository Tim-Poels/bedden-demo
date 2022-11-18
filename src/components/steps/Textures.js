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

import blueAO from "../../assets/textures/AO/blue.jpg"
import blueColor from "../../assets/textures/Color/blue.jpg"
import blueNormal from "../../assets/textures/Normal/blue.jpg"
import blueRoughness from "../../assets/textures/Roughness/blue.jpg"
import blueImg from "../../assets/textures/Cover/blue.jpg"

import lightBlueAO from "../../assets/textures/AO/light-blue.jpg"
import lightBlueColor from "../../assets/textures/Color/light-blue.jpg"
import lightBlueNormal from "../../assets/textures/Normal/light-blue.jpg"
import lightBlueRoughness from "../../assets/textures/Roughness/light-blue.jpg"
import lightBlueImg from "../../assets/textures/Cover/light-blue.jpg"

import emeraldAO from "../../assets/textures/AO/emerald.jpg"
import emeraldColor from "../../assets/textures/Color/emerald.jpg"
import emeraldNormal from "../../assets/textures/Normal/emerald.jpg"
import emeraldRoughness from "../../assets/textures/Roughness/emerald.jpg"
import emeraldImg from "../../assets/textures/Cover/emerald.jpg"

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
import middlePillowNormal from "../../assets/textures/Normal/outsidePillows.jpg"
import middlePillowRoughness from "../../assets/textures/Roughness/outsidePillows.jpg"

import outsidePillowsColor from "../../assets/textures/Color/outsidePillows.jpg"
import outsidePillowsNormal from "../../assets/textures/Normal/outsidePillows.jpg"
import outsidePillowsRoughness from "../../assets/textures/Roughness/outsidePillows.jpg"

import { scene } from "../CanvasElement.js"
import * as THREE from "three"
import { getBed } from "./Step1.js"

const textures = [
  {
    Id: 0,
    Name: "Dark Blue",
    Img: blueImg, 
    AO: blueAO,
    Color: blueColor,
    Normal: blueNormal,
    Roughness: blueRoughness,
  },
  {
    Id: 1,
    Name: "Ash Grey",
    Img: whiteImg, 
    AO: whiteAO,
    Color: whiteColor,
    Normal: whiteNormal,
    Roughness: whiteRoughness,
  },
  {
    Id: 2,
    Name: "Warm Orange",
    Img: orangeImg, 
    AO: orangeAO,
    Color: orangeColor,
    Normal: orangeNormal,
    Roughness: orangeRoughness,
  },
  {
    Id: 3,
    Name: "Dark Yellow",
    Img: yellowImg, 
    AO: yellowAO,
    Color: yellowColor,
    Normal: yellowNormal,
    Roughness: yellowRoughness,
  },
  {
    Id: 4,
    Name: "Bordeaux",
    Img: redImg, 
    AO: redAO,
    Color: redColor,
    Normal: redNormal,
    Roughness: redRoughness,
  },
  {
    Id: 5,
    Name: "Light Blue",
    Img: lightBlueImg, 
    AO: lightBlueAO,
    Color: lightBlueColor,
    Normal: lightBlueNormal,
    Roughness: lightBlueRoughness,
  },
  {
    Id: 6,
    Name: "Emerald",
    Img: emeraldImg, 
    AO: emeraldAO,
    Color: emeraldColor,
    Normal: emeraldNormal,
    Roughness: emeraldRoughness,
  },
];

export const addTexture = () => {
  const textureLoader = new THREE.TextureLoader()

  let index = 0 // Index of the texture that you want loaded when there is no texture in the sessionStorage

  let sessionTexture = sessionStorage.getItem("texture");

  if (sessionTexture) {
    switch (sessionTexture) {
      case "Dark Blue":
        index = 0;
        break;
      case "Ash Grey":
        index = 1;
        break;
      case "Warm Orange":
        index = 2;
        break;
      case "Dark Yellow":
        index = 3;
        break;
      case "Bordeaux":
        index = 4;
        break;
      case "Light Blue":
        index = 5;
        break;
      case "Emerald":
        index = 6;
        break;
      default: 
        index = 0;
        sessionStorage.setItem("texture", "Dark Blue");
        break;
    }
  }
  else {
    sessionStorage.setItem("texture", "Dark Blue");
  }


  let bed = getBed(scene)

  if(!bed) {
    console.log("ERROR: no bed found at addTexture()")
    return null
  }

  let repeatScale = 0.3

  let frameColor = textureLoader.load( textures[index].Color );
  frameColor.wrapS = THREE.RepeatWrapping;
  frameColor.wrapT = THREE.RepeatWrapping;
  frameColor.repeat.set( repeatScale, repeatScale );
        
  let frameNormal = textureLoader.load( textures[index].Normal );
  frameNormal.wrapS = THREE.RepeatWrapping;
  frameNormal.wrapT = THREE.RepeatWrapping;
  frameNormal.repeat.set( repeatScale, repeatScale );

  let frameRoughness = textureLoader.load( textures[index].Roughness );
  frameRoughness.wrapS = THREE.RepeatWrapping;
  frameRoughness.wrapT = THREE.RepeatWrapping;
  frameRoughness.repeat.set( repeatScale, repeatScale );

  let frameAO = textureLoader.load( textures[index].AO );
  frameAO.wrapS = THREE.RepeatWrapping;
  frameAO.wrapT = THREE.RepeatWrapping;
  frameAO.repeat.set( repeatScale, repeatScale );

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

  bed.longPillow.material = matresMaterial

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
    // roughnessMap: bigBlanketRoughnessMap,
    roughness: 1
  })

  bed.bigBlanket.material = bigBlanketMaterial

  let middlePillowColorMap = textureLoader.load( middlePillowColor )
  middlePillowColorMap.wrapS = THREE.RepeatWrapping;
  middlePillowColorMap.wrapT = THREE.RepeatWrapping;
  middlePillowColorMap.repeat.set(2, 2);

  let middlePillowRoughnessMap = textureLoader.load( middlePillowRoughness )
  middlePillowRoughnessMap.wrapS = THREE.RepeatWrapping;
  middlePillowRoughnessMap.wrapT = THREE.RepeatWrapping;
  middlePillowRoughnessMap.repeat.set(2, 2);

  let middlePillowNormalMap = textureLoader.load( middlePillowNormal )
  middlePillowNormalMap.wrapS = THREE.RepeatWrapping;
  middlePillowNormalMap.wrapT = THREE.RepeatWrapping;
  middlePillowNormalMap.repeat.set(2, 2);

  let middlePillowMaterial = new THREE.MeshStandardMaterial({ 
    map: middlePillowColorMap,
    normalMap: middlePillowNormalMap,
    roughnessMap: middlePillowRoughnessMap,
  })

  bed.middlePillow.material = middlePillowMaterial

  let outsidePillowsColorMap = textureLoader.load( outsidePillowsColor )
  outsidePillowsColorMap.wrapS = THREE.RepeatWrapping;
  outsidePillowsColorMap.wrapT = THREE.RepeatWrapping;
  outsidePillowsColorMap.repeat.set(2, 2);

  let outsidePillowsRoughnessMap = textureLoader.load( outsidePillowsRoughness )
  middlePillowRoughnessMap.wrapS = THREE.RepeatWrapping;
  middlePillowRoughnessMap.wrapT = THREE.RepeatWrapping;
  middlePillowRoughnessMap.repeat.set(2, 2);

  let outsidePillowsNormalMap = textureLoader.load( outsidePillowsNormal )
  outsidePillowsNormalMap.wrapS = THREE.RepeatWrapping;
  outsidePillowsNormalMap.wrapT = THREE.RepeatWrapping;
  outsidePillowsNormalMap.repeat.set(2, 2);

  let outsidePillowsMaterial = new THREE.MeshStandardMaterial({ 
    map: outsidePillowsColorMap,
    normalMap: outsidePillowsNormalMap,
    // roughnessMap: outsidePillowsRoughnessMap,
    roughness: 1,
  })

  bed.outsidePillows.material = outsidePillowsMaterial
}

export default textures