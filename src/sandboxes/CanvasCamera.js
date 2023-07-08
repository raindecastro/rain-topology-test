import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CameraControls } from 'three-stdlib'

const CanvasCamera = () => {
  const cameraControlRef = useRef(null)

  useEffect(() => {
    if (cameraControlRef) {
      cameraControlRef.current?.truck(100, 0, true)
    }
  }, [])

  return <CameraControls ref={cameraControlRef} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}

export default CanvasCamera
