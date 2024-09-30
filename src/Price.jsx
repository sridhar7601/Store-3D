import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"
import { easing } from "maath"

const Counter = ({ index, value, speed = 0.1 }) => {
  const ref = useRef()
  const stencil = useMask(1)
  useFrame((state, delta) => easing.damp(ref.current.position, "y", value * -2, speed, delta))
  return (
    <group position-x={index * 1.1} ref={ref}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Text key={number} position={[0, number * 2, 0]} fontSize={2} >
          {number}
          <meshBasicMaterial {...stencil} />
        </Text>
      ))}
    </group>
  )
}

const Price = ({ value, currency = "$", ...props }) => (
  <group {...props}>
    {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
      <Counter key={index} index={index} value={num === "✨" ? -1 : num} speed={0.1 * (4 - index)} />
    ))}
    <Text anchorY="bottom" position={[4 * 1.1, -0.25, 0]} fontSize={1}>
      {currency}
    </Text>
    <Mask id={1}>
      <planeGeometry args={[10, 1.55]} />
    </Mask>
  </group>
)

export default Price