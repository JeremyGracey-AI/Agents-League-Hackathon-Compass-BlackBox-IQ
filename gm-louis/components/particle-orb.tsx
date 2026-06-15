"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

// F.A.M. palette — Facts (Foundry IQ) blue, Activity (Work IQ) teal, Meaning (Fabric IQ) purple
const FACTS = "#4f8cff"
const ACTIVITY = "#16c2a3"
const MEANING = "#9871f0"
const VAULT = "#f59e0b"

function DottedSphere({ radius = 1.2, dotCount = 800, dotSize = 0.035 }) {
  const groupRef = useRef<THREE.Group>(null)

  const dots = useMemo(() => {
    const out: { pos: [number, number, number]; color: string }[] = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i
      const x = Math.cos(theta) * radiusAtY * radius
      const z = Math.sin(theta) * radiusAtY * radius
      // three vertical bands -> the three F.A.M. lenses
      const color = y > 0.34 ? FACTS : y > -0.34 ? ACTIVITY : MEANING
      out.push({ pos: [x, y * radius, z], color })
    }
    return out
  }, [radius, dotCount])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[dotSize, 8, 8]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.color}
            emissiveIntensity={0.9}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

function GlowingCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04
      meshRef.current.scale.set(scale, scale, scale)
    }
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.17, 32, 32]} />
      <meshStandardMaterial color={VAULT} emissive={VAULT} emissiveIntensity={2.4} metalness={0.5} roughness={0.15} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color={MEANING} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color={ACTIVITY} />
      <GlowingCore />
      <DottedSphere radius={1.2} dotCount={800} dotSize={0.035} />
    </>
  )
}

export function ParticleOrb() {
  return (
    <div className="w-48 h-48 relative">
      <div className="absolute inset-[-30%] bg-gradient-radial from-amber-400/15 via-blue-500/5 to-transparent rounded-full blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
