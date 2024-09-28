// Room.js
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Room(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/room.gltf')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 2) / 8
    group.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.009}>
        {Object.entries(nodes).map(([nodeName, node]) => (
          node.geometry ? (
            <mesh
              key={nodeName}
              geometry={node.geometry}
              material={materials[node.material.name]}
              castShadow
              receiveShadow
            />
          ) : null
        ))}
      </group>
    </group>
  )
}

useGLTF.preload('/room.gltf')