import React, { useState, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
import { Select } from "@react-three/postprocessing"
import { debounce } from "lodash"
import Price from './Price'
import Sofa from '/public/'

function Scene() {
  const { nodes, materials } = useGLTF('/scene.gltf')
  const [hovered, setHovered] = useState(null)
  const debouncedHover = useCallback(debounce(setHovered, 30), [])

  const prices = {
    Sofa: 999,
    Plant: 59,
    Table: 299
  }

  const over = (name) => (e) => {
    e.stopPropagation()
    debouncedHover(name)
  }

  return (
    <group>
      {/* <Model nodes={nodes} materials={materials} /> */}
      
      <Select enabled={hovered === "Sofa"} onPointerOver={over("Sofa")} onPointerOut={() => debouncedHover(null)}>
        <Sofa position={[0, 0, 0]} scale={10} rotation={[0, Math.PI, 0]} />
      </Select>

      <Select enabled={hovered === "Plant"} onPointerOver={over("Plant")} onPointerOut={() => debouncedHover(null)}>
        <mesh 
          geometry={nodes.Green_plant_monstera.geometry} 
          material={materials.Amulet} 
          position={[0.777, 0.814, 1.18]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.001}
        />
      </Select>

      <Select enabled={hovered === "Table"} onPointerOver={over("Table")} onPointerOut={() => debouncedHover(null)}>
        <mesh 
          geometry={nodes.Coffee_Table.geometry} 
          material={materials['Eagle Eye']} 
          position={[0.072, 0.212, 0.164]}
          rotation={[-Math.PI / 2, 0, 0.306]}
          scale={0.001}
        />
      </Select>

      <Price value={prices[hovered] || 0} position={[-2, 0.3, -3.25]} />
    </group>
  )
}

export default Scene