import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      camera.position.set(-3, 3, 3)
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 2;
      controls.maxDistance = 10;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const CanvasElement = (props) => {
  return (
    <Canvas className="CanvasElement">
      <CameraController />

      <ambientLight intensity={0.4} />
      <directionalLight color="white" position={[0, 0, 5]} />

      <Suspense fallback={null}>
        <Bed />
      </Suspense>
    </Canvas>
  );
}

const Controls = () => {
  return (
    <OrbitControls />
  )
}

const Bed = () => {
  const { scene } = useGLTF('bed-test.glb')
  scene.children[0].position.set(0, 0, 0);
  return <primitive object={scene} />
}

export default CanvasElement;