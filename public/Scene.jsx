/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 scene.gltf 
Author: INTERIA (https://sketchfab.com/noobsipahi724)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/interior-free-f2dd8608de934584b3983628e853540a
Title: Interior (Free)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0, -49.207, 0]} scale={100}>
          <mesh geometry={nodes.PinLight_plastic_0.geometry} material={materials.plastic} />
          <mesh geometry={nodes.PinLight_emission_0.geometry} material={materials.emission} />
        </group>
        <group scale={100}>
          <mesh geometry={nodes.Room_FLOOR_0.geometry} material={materials.FLOOR} />
          <mesh geometry={nodes.Room_WALL_0.geometry} material={materials.WALL} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
