import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from '/public/Demo'  // Adjust the import path as needed
import { Leva, useControls } from "leva";

function App() {
  const { intensity, wallColor, floorColor } = useControls({
    intensity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.05
    },
    wallColor: "#ffffff",
    floorColor: "#cccccc"
  });

  return (
    <>
      <Leva />
      <Canvas>
        <ambientLight intensity={intensity} />
        <Suspense fallback={null}>
          <Model wallColor={wallColor} floorColor={floorColor} />
          <OrbitControls />
          <Environment preset="apartment" intensity={intensity} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App