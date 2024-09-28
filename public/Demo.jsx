/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 Demo.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/Demo.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0.16, 0, -0.156]} rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
        <group rotation={[0, 0, -0.475]}>
          <group position={[75.76, -302.681, 214.496]} rotation={[0, 0, 0.781]} scale={364.899}>
            <mesh geometry={nodes.Plant_1.geometry} material={materials['Plant_green_bob 1']} position={[0.002, 0.001, -0.202]} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Plant_2.geometry} material={materials.Plant_green_bob} position={[0.002, 0.001, -0.202]} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Pot.geometry} material={materials['Concrete 1']} position={[0.002, 0.001, -0.202]} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Soil.geometry} material={materials.Mud} position={[0.002, 0.001, -0.202]} rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <mesh geometry={nodes.carpet.geometry} material={materials['Mud 1']} position={[-76.905, -153.97, 0.368]} rotation={[0, 0, 0.781]} scale={0.899} />
          <mesh geometry={nodes.Backdrop.geometry} material={materials.Belfast} position={[0, -350, 0]} scale={[1.425, 1, 1]} />
        </group>
      </group>
      <group position={[0.018, -0.001, -0.046]} rotation={[-Math.PI / 2, 0, 0.306]} scale={0.001}>
        <group position={[38.138, 51.676, 6.321]} scale={0.4}>
          <mesh geometry={nodes.Bottom_piece.geometry} material={materials['Material #26 1']} position={[-281.033, -1.263, 263.752]} />
          <mesh geometry={nodes.Wood_part.geometry} material={materials['Wood 2']} position={[-281.033, -1.263, 263.752]} />
          <mesh geometry={nodes.Gold_piece.geometry} material={materials['Material #26']} position={[-281.033, -1.263, 263.752]} />
        </group>
        <mesh geometry={nodes.Plywood.geometry} material={materials['Wood 3']} position={[-70.065, 51.91, 147.816]} scale={0.4} />
        <mesh geometry={nodes.Seat.geometry} material={materials['Red velvet']} position={[-9.537, 51.274, 214.349]} scale={0.4} />
        <mesh geometry={nodes.Pillow.geometry} material={materials['Fabric 2']} position={[62.434, 102.691, 268.471]} scale={0.275} />
      </group>
      <mesh geometry={nodes.Coffee_Table.geometry} material={materials['Eagle Eye']} position={[0.072, 0.212, 0.164]} rotation={[-Math.PI / 2, 0, 0.306]} scale={0} />
    </group>
  )
}

useGLTF.preload('/Demo.gltf')
