import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, Preload, Lightformer, Environment, CameraControls, RenderTexture, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import Turtle from './sandboxes/Turtle'
import Basic from './sandboxes/Basic'
import PingPong from './sandboxes/PingPong'
import Shoe from './sandboxes/Shoe'
import Stencil from './sandboxes/Stencil'
import Rocket from './sandboxes/Rocket'
import CanvasCamera from './sandboxes/CanvasCamera'

const DEG45 = Math.PI / 8

export default function App() {
  const cameraControlRef = useRef(null)

  useEffect(() => {
    if (cameraControlRef) {
      console.log('RAN')
      let x = 0
      let id = null
      setTimeout(() => {
        id = setInterval(() => {
          console.log(cameraControlRef.current)
          cameraControlRef.current?.truck(x, 0, true)
          x = x + 1

          if (x === 15) {
            console.log('CLEAR')
            setTimeout(() => {
              cameraControlRef.current?.forward(-80, true)
              cameraControlRef.current?.rotate(-DEG45, 0, true)
              cameraControlRef.current?.truck(-92, 0, true)
            }, 2000)
            clearInterval(id)
          }
        }, 220)
      }, 1000)
    }

    return () => {
      clearInterval(id)
    }
  }, [])

  // useFrame(() => {
  //   const widthHalf = size.width / 2
  //   const targetX = (viewport.width - size.width) / 2

  //   controls.current.target.x = targetX
  // })

  return (
    <Canvas dpr={[1.5, 2]} camera={{ position: [0, 0, 40], fov: 75, near: 1, far: 1000 }}>
      {/** The physics world */}
      {/* <CameraControls ref={cameraControlRef} /> */}
      <Physics gravity={[0, -20, 0]} interpolation={false} colliders={false}>
        <Letter char="T" position={[12, 8, 0]} rotation={[0, 0, 0]}>
          {/** The sandboxes dropped into here have no idea what's going to happen.
               For all intents and purposes they're just self-contained components.  */}
          <Turtle />
        </Letter>

        <Letter char="0" position={[24, 16, 0]} rotation={[0, 0, 0]}>
          <Shoe scale={5} />
        </Letter>

        <Letter char="P" position={[34, 24, 0]} rotation={[0, 0, 0]}>
          <Rocket position={[-1, -1, 0]} scale={0.6} />
        </Letter>

        <Letter char="0" position={[52, 32, 2]} rotation={[0, 0, 0]}>
          <Basic scale={3} />
        </Letter>

        <Letter char="L" position={[64, 40, 0]} rotation={[0, 0, 0]}>
          <PingPong />
        </Letter>

        <Letter char="0" position={[74, 52, 0]} rotation={[0, 0, 0]} stencilBuffer>
          <Stencil scale={2} />
        </Letter>

        <Letter char="G" position={[86, 70, 0]} rotation={[0, 0, 0]} stencilBuffer>
          <Stencil scale={2} />
        </Letter>

        <Letter char="Y" position={[100, 86, 0]} rotation={[0, 0, 0]} stencilBuffer>
          <Stencil scale={2} />
        </Letter>

        {/** Invisible walls */}
        <CuboidCollider position={[0, -6, 0]} type="fixed" args={[200, 1, 200]} />
        <CuboidCollider position={[0, 0, -48]} type="fixed" args={[48, 100, 1]} />
        <CuboidCollider position={[0, 0, 6]} type="fixed" args={[6, 100, 1]} />
        <CuboidCollider position={[-30, 0, 0]} type="fixed" args={[1, 100, 30]} />
        <CuboidCollider position={[30, 0, 0]} type="fixed" args={[1, 100, 30]} />
      </Physics>
      {/** Environment (for reflections) */}
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" resolution={1024}>
        {/** On top of the HDRI we add some rectangular and circular shapes for nicer reflections */}
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
          ))}
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
        </group>
      </Environment>
      {/** Contact shadows for naive soft shadows */}
      <ContactShadows smooth={false} scale={100} position={[0, -5.05, 0]} blur={0.5} opacity={0.75} />
      {/** Yomotsu/camera-controls, a better replacement for OrbitControls */}
      <CameraControls ref={cameraControlRef} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      {/** Makes sure everything is processed and GPU uploaded before Threejs "sees" it */}
      <Preload all />
    </Canvas>
  )
}

function Letter({ char, children, stencilBuffer = false, ...props }) {
  const main = useRef()
  const contents = useRef()
  const events = useThree((state) => state.events)
  const controls = useThree((state) => state.controls)
  // The letters contents are moved to its whereabouts in world coordinates
  useFrame(() => contents.current.matrix.copy(main.current.matrixWorld))
  return (
    /** A physics rigid body */
    <RigidBody restitution={0.1} colliders="cuboid" {...props}>
      {/** Center each letter */}
      <Center ref={main}>
        <Text3D
          bevelEnabled
          onDoubleClick={(e) => (e.stopPropagation(), controls.fitToBox(main.current, true))}
          font="/bold.blob"
          smooth={1}
          scale={0.125}
          size={80}
          height={4}
          curveSegments={10}
          bevelThickness={10}
          bevelSize={2}
          bevelOffset={0}
          bevelSegments={5}>
          {char}
          <MeshTransmissionMaterial clearcoat={1} samples={3} thickness={40} chromaticAberration={0.25} anisotropy={0.4}>
            {/** Render a portalled scene into the "buffer" attribute of transmission material, which is a texture.
                 Since we're moving the contents with the letter shape in world space we take the standard event compute. */}
            <RenderTexture attach="buffer" stencilBuffer={stencilBuffer} width={512} height={512} compute={events.compute}>
              {/** Everything in here is self-contained, behaves like a regular canvas, but we're *in* the texture */}
              <color attach="background" args={['#4899c9']} />
              <group ref={contents} matrixAutoUpdate={false}>
                {/** Drop the children in here, this is where the sandboxes land. */}
                {children}
              </group>
              <Preload all />
            </RenderTexture>
          </MeshTransmissionMaterial>
        </Text3D>
      </Center>
    </RigidBody>
  )
}
