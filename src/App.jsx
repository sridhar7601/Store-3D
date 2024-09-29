// import { Suspense } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, Environment } from '@react-three/drei'
// import Model from '/public/Chair'  // Adjust the import path as needed
// import { Leva, useControls } from "leva";

// function App() {
//   const { intensity, wallColor, floorColor } = useControls({
//     intensity: {
//       value: 1,
//       min: 0,
//       max: 1,
//       step: 0.05
//     },
//     wallColor: "#ffffff",
//     floorColor: "#cccccc"
//   });

//   return (
//     <>
//       <Leva />
//       <Canvas>
//         <ambientLight  />
//         <Suspense fallback={null}>
//           <Model  />
//           <OrbitControls />
//           <Environment preset="apartment" intensity={intensity} />
//         </Suspense>
//       </Canvas>
//     </>
//   )
// }

// export default App


import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, PointerLockControls, useGLTF } from '@react-three/drei'
import { Leva, useControls } from "leva";
import * as THREE from 'three'
// import Sofa from '/public/Sofa'

function Player({ speed = 100, verticalSpeed = 60 }) {
  const { camera } = useThree()
  const moveForward = useRef(false)
  const moveBackward = useRef(false)
  const moveLeft = useRef(false)
  const moveRight = useRef(false)
  const moveUp = useRef(false)
  const moveDown = useRef(false)

  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW': moveForward.current = true; break
        case 'KeyS': moveBackward.current = true; break
        case 'KeyA': moveLeft.current = true; break
        case 'KeyD': moveRight.current = true; break
        case 'Space': moveUp.current = true; break
        case 'KeyF': moveDown.current = true; break
      }
    }

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW': moveForward.current = false; break
        case 'KeyS': moveBackward.current = false; break
        case 'KeyA': moveLeft.current = false; break
        case 'KeyD': moveRight.current = false; break
        case 'Space': moveUp.current = false; break
        case 'KeyF': moveDown.current = false; break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    velocity.current.x -= velocity.current.x * 10.0 * delta
    velocity.current.y -= velocity.current.y * 10.0 * delta
    velocity.current.z -= velocity.current.z * 10.0 * delta

    direction.current.z = Number(moveForward.current) - Number(moveBackward.current)
    direction.current.x = Number(moveRight.current) - Number(moveLeft.current)
    direction.current.y = Number(moveUp.current) - Number(moveDown.current)
    direction.current.normalize()

    if (moveForward.current || moveBackward.current) velocity.current.z -= direction.current.z * speed * delta
    if (moveLeft.current || moveRight.current) velocity.current.x -= direction.current.x * speed * delta
    if (moveUp.current || moveDown.current) velocity.current.y += direction.current.y * verticalSpeed * delta

    camera.translateX(-velocity.current.x * delta)
    camera.translateY(velocity.current.y * delta)
    camera.translateZ(-velocity.current.z * delta)
  })

  return null
}
function Model(props) {
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group {...props} dispose={null} scale={0.05}>
      <group position={[0, -49.207, 0]} scale={100}>
        <mesh geometry={nodes.PinLight_plastic_0.geometry} material={materials.plastic} />
        <mesh geometry={nodes.PinLight_emission_0.geometry} material={materials.emission} />
      </group>
      <group scale={100}>
        <mesh geometry={nodes.Room_FLOOR_0.geometry} material={materials.FLOOR} />
        <mesh geometry={nodes.Room_WALL_0.geometry} material={materials.WALL} />
      </group>
    </group>
  )
}

// Updated Sofa component
function Sofa(props) {
  const { nodes, materials } = useGLTF('/sofa.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0.018, -0.001, -0.046]} rotation={[-Math.PI / 2, 0, 0.306]} scale={0.001}>
        {/* Sofa parts remain unchanged */}
        <group position={[38.138, 51.676, 6.321]} scale={0.4}>
          <mesh geometry={nodes.Bottom_piece.geometry} material={materials['Material #26 1']} position={[-281.033, -1.263, 263.752]} />
          <mesh geometry={nodes.Wood_part.geometry} material={materials['Wood 2']} position={[-281.033, -1.263, 263.752]} />
          <mesh geometry={nodes.Gold_piece.geometry} material={materials['Material #26']} position={[-281.033, -1.263, 263.752]} />
        </group>
        <mesh geometry={nodes.Plywood.geometry} material={materials['Wood 3']} position={[-70.065, 51.91, 147.816]} scale={0.4} />
        <mesh geometry={nodes.Seat.geometry} material={materials['Red velvet']} position={[-9.537, 51.274, 214.349]} scale={0.4} />
        <mesh geometry={nodes.Pillow.geometry} material={materials['Fabric 2']} position={[62.434, 102.691, 268.471]} scale={0.275} />
      </group>

      {/* Plant adjustments */}
      <mesh 
        geometry={nodes.Green_plant_monstera.geometry} 
        material={materials.Amulet} 
        position={[0.777, 0.814, 1.18]} // Adjust position: [left/right, up/down, forward/backward]
        rotation={[-Math.PI / 2, 0, 0]} // Adjust rotation if needed: [x-axis, y-axis, z-axis]
        scale={0.001} // Adjust overall size: increase for larger, decrease for smaller
        // To adjust width and height independently, use scale={[width, height, depth]}
        // For example, scale={[0.002, 0.003, 0.002]} for a taller, narrower plant
      />

      {/* Table adjustments */}
      <mesh 
        geometry={nodes.Coffee_Table.geometry} 
        material={materials['Eagle Eye']} 
        position={[0.072, 0.212, 0.164]} // Adjust position: [left/right, up/down, forward/backward]
        rotation={[-Math.PI / 2, 0, 0.306]} // Adjust rotation if needed: [x-axis, y-axis, z-axis]
        scale={0.001} // Adjust overall size: increase for larger, decrease for smaller
        // To adjust width and height independently, use scale={[width, height, depth]}
        // For example, scale={[0.0015, 0.001, 0.0015]} for a wider, shorter table
      />
    </group>
  )
}

// Updated Scene component
function Scene() {
  const { intensity, wallColor, floorColor } = useControls({
    intensity: { value: 1, min: 0, max: 1, step: 0.05 },
    wallColor: "#ffffff",
    floorColor: "#cccccc"
  });

  return (
    <>
      <ambientLight intensity={intensity} />
      <pointLight position={[0, 10, 0]} intensity={1} />
      <Model />
      {/* CHANGE 2: Adjust the scale, position, and rotation of the Sofa here */}
      <Sofa position={[0, 0, 0]} scale={10} rotation={[0, Math.PI, 0]} />
      <Player speed={100} verticalSpeed={60} />
    </>
  )
}

// App component remains unchanged
function App() {
  return (
    <>
      <Leva />
      <Canvas>
        <PerspectiveCamera makeDefault fov={70} near={0.1} far={1000} position={[0, 1.6, 0]} />
        <Suspense fallback={null}>
          <Scene />
          <PointerLockControls />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App

useGLTF.preload('/scene.gltf')
useGLTF.preload('/sofa.gltf')