import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

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

export default Player