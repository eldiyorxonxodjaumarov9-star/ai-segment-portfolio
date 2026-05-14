"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AiCore() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.12;
    mesh.current.rotation.y = t * 0.22;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function FuturisticScene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 3.6], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.12} />
      <pointLight position={[3.2, 2.4, 2.2]} intensity={24} color="#c084fc" />
      <pointLight position={[-3, -1.6, 2.4]} intensity={22} color="#22d3ee" />
      <Stars radius={90} depth={45} count={3800} factor={3.2} saturation={0} fade speed={0.55} />
      <AiCore />
    </Canvas>
  );
}
