import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei"

const CanvasElement = (props) => {
  return (
    <Canvas className="CanvasElement">
      <ambientLight intensity={0.4} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <Bed />
      </Suspense>
    </Canvas>
  );
}

const Bed = () => {
  const { scene } = useGLTF('bed-test.glb')
  return <primitive object={scene} />
}

export default CanvasElement;