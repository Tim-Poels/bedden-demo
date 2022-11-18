import React, { useEffect } from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { addTexture } from "./steps/Textures.js"
import { loadLegs } from "./steps/Step3.js"
import { getBed } from "./steps/Step1.js"

// Exporting the scene so that it can be accessed from any component (it will remain undefined un till the scene(not the bed model) is loaded)
export var scene;

// React.memo() makes it so that the component will not rerender, so when a state is changed (for example the steps state) this component will not rerender meaning we don't have to wait for the model to reload
export const CanvasElement = React.memo((props) => {
  useEffect(() => {
    // Canvas
    const canvas = document.querySelector('.CanvasElement')

    // Scene
    scene = new THREE.Scene()

    // GLTFLoader
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
    loader.setDRACOLoader( dracoLoader );

    // Load a glTF resource
    loader.load(
    	// resource URL
	    'bed-no-cubboard.glb',
	    // called when the resource is loaded
    	function ( gltf ) {
        gltf.scene.children[0].position.set(0, 0, 0)

        gltf.scene.scale.set(0.001, 0.001, 0.001)
        gltf.scene.children[0].scale.set(1, 1, 1)

        let currentWidth = parseInt(sessionStorage.getItem("currentWidth"), 10)
        let currentLength = parseInt(sessionStorage.getItem("currentLength"), 10)

        gltf.scene.children[0].scale.x = currentWidth / 200
        gltf.scene.children[0].scale.z = currentLength / 220

        gltf.scene.traverse((mesh) => {
          if (mesh.isMesh) {
            mesh.castShadow = true;
            // mesh.recieveShadow = true;
          }  
        })

    		scene.add( gltf.scene );

        let widthScaleAdjust = 1
        let lengthScaleAdjust = 1

        if (currentWidth !== 200 || currentLength !== 220) {
          let bed = getBed(scene);

          widthScaleAdjust = currentWidth / 200

          bed.middlePillow.scale.x /= widthScaleAdjust
          bed.outsidePillows.scale.x /= widthScaleAdjust

          lengthScaleAdjust = currentLength / 220

          bed.middlePillow.scale.z /= lengthScaleAdjust
          bed.outsidePillows.scale.z /= lengthScaleAdjust
          bed.smallBlanket.scale.z /= lengthScaleAdjust
          bed.bigBlanket.scale.z /= lengthScaleAdjust

          let amountOfScaleAdjusts = Math.abs(currentLength - 220) / 5
          if (lengthScaleAdjust < 1) {
            bed.bigBlanket.position.z -= 45 * amountOfScaleAdjusts
            bed.smallBlanket.position.z -= 50 * amountOfScaleAdjusts
          }
          else if (lengthScaleAdjust > 1) {
            bed.bigBlanket.position.z += 45 * amountOfScaleAdjusts
            bed.smallBlanket.position.z += 50 * amountOfScaleAdjusts
          }
        }

        addTexture();
        
        let bedObject = getBed(scene)
        let oldLegs = bedObject.legs;
        oldLegs.removeFromParent();
        scene.remove(oldLegs)
        
        let sessionLegTexture = sessionStorage.getItem("currentLeg")
        if (!sessionLegTexture) {
          sessionStorage.setItem("currentLegTexture", "legTexture0")
        }

        let sessionLeg = sessionStorage.getItem("currentLeg")

        if (sessionLeg) {
          loadLegs(sessionLeg)
        }
        else {
          loadLegs("legs/101_POOT_A.glb")
          sessionStorage.setItem("currentLeg", "legs/101_POOT_A.glb")
        }

        let bedFloor = new THREE.Mesh(
          new THREE.BoxGeometry(1.9 * widthScaleAdjust, 2.1 * lengthScaleAdjust, 0.1),
          new THREE.MeshStandardMaterial({ color: "black" })
        )

        bedFloor.rotation.x = Math.PI / 2
        bedFloor.position.y = 0.25
        bedFloor.castShadow = true
        bedFloor.name = "bedFloor"
        
        scene.add(bedFloor)

        bedObject.smallBlanket.removeFromParent();
        scene.remove(bedObject.smallBlanket)
        
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

    // Floor
    const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.ShadowMaterial({
        opacity: 0.5
      })
    )

    floor.rotation.x = - Math.PI * 0.5

    floor.receiveShadow = true;

    scene.add(floor)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(7, 15, 7)
    scene.add(directionalLight)

    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;

    directionalLight.shadow.camera.top = 2
    directionalLight.shadow.camera.right = -2
    directionalLight.shadow.camera.bottom = -2
    directionalLight.shadow.camera.left = 2

    directionalLight.shadow.camera.near = 15;
    directionalLight.shadow.camera.far = 29;

    // const helper = new THREE.CameraHelper(directionalLight.shadow.camera)
    // scene.add(helper)

    // Sizes
    const sizes = {
      width: window.innerWidth - 650,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth - 650
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    // Camera

    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(-3, 1.75, 2)
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true

    // Renderer

    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor( 0xffffff, 0);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Animate
    // const clock = new THREE.Clock()
    // let previousTime = 0

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime()
      // const deltaTime = elapsedTime - previousTime
      // previousTime = elapsedTime

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  })
  return (
    <canvas className="CanvasElement">
    </canvas>
  );
});