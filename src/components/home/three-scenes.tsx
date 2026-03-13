"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";



function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#00d1ff"
          wireframe
          distort={0.3}
          speed={3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 200;
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d1ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ============= Exported Scene Components =============

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ pointerEvents: "none" }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        gl={{ antialias: typeof window !== 'undefined' && window.innerWidth >= 768, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d1ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#7c3aed" />
        <ParticleField />
        <GlowingSphere />
      </Canvas>
    </div>
  );
}

function WaveGrid() {
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const segW = isMobile ? 20 : 40;
  const segH = isMobile ? 20 : 40;

  useFrame(({ clock }) => {
    if (!geometryRef.current) return;
    const pos = geometryRef.current.attributes.position;
    const time = clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 1.5 + time) * 0.15 +
        Math.cos(y * 1.5 + time * 0.8) * 0.15;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry ref={geometryRef} args={[10, 10, segW, segH]} />
      <meshStandardMaterial
        color="#00d1ff"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

export function ManifestoScene() {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        style={{ pointerEvents: "none" }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        gl={{ antialias: typeof window !== 'undefined' && window.innerWidth >= 768, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 5]} intensity={0.4} color="#00d1ff" />
        <WaveGrid />
      </Canvas>
    </div>
  );
}

function GlobePoints() {
  const groupRef = useRef<THREE.Group>(null);
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) / 2) * i * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * radius * 2;
      pos[i * 3 + 1] = y * 2;
      pos[i * 3 + 2] = Math.sin(theta) * radius * 2;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#00d1ff"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
      <mesh>
        <sphereGeometry args={[2.05, 24, 24]} />
        <meshStandardMaterial
          color="#00d1ff"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

export function CTAScene() {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ pointerEvents: "none" }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        gl={{ antialias: typeof window !== 'undefined' && window.innerWidth >= 768, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 5]} intensity={0.5} color="#00d1ff" />
        <pointLight position={[-3, -3, 5]} intensity={0.3} color="#7c3aed" />
        <GlobePoints />
      </Canvas>
    </div>
  );
}
