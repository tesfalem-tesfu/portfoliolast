import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Floating orb with distortion
function DistortOrb({ position, color, speed = 1, distort = 0.4, scale = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={mesh} args={[0.28 * scale, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Orbiting ring
function OrbitRing({ radius, color, speed, tilt = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });
  return (
    <Ring
      ref={ref}
      args={[radius - 0.015, radius + 0.015, 128]}
      rotation={[Math.PI / 2 + tilt, 0, 0]}
    >
      <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
    </Ring>
  );
}

// Small particle dot
function Particle({ position, color }) {
  const ref = useRef();
  const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

// Particles cloud
function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 4,
      ],
      color: ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4', '#f59e0b', '#10b981'][Math.floor(Math.random() * 6)],
    }));
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} position={p.position} color={p.color} />
      ))}
    </>
  );
}

// Central glowing core
function Core() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.07;
      ref.current.scale.setScalar(pulse);
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.75, 1]} />
      <MeshDistortMaterial
        color="#7c3aed"
        distort={0.35}
        speed={1.5}
        roughness={0}
        metalness={1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Wireframe outer shell
function WireShell() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.15;
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.05, 1]} />
      <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

// Full 3D scene
function Scene() {
  const orbData = [
    { position: [1.8, 0.5, 0],    color: '#a855f7', speed: 0.8, distort: 0.5 },
    { position: [-1.8, -0.3, 0.5], color: '#ec4899', speed: 1.1, distort: 0.6 },
    { position: [0.8, -1.6, 0.3],  color: '#3b82f6', speed: 0.7, distort: 0.4 },
    { position: [-1.0, 1.4, -0.3], color: '#06b6d4', speed: 1.3, distort: 0.5 },
    { position: [1.5, -1.2, -0.4], color: '#f59e0b', speed: 0.9, distort: 0.3, scale: 0.7 },
    { position: [-1.6, 0.9, 0.6],  color: '#10b981', speed: 1.0, distort: 0.45, scale: 0.8 },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#ec4899" />
      <pointLight position={[0, 0, 8]} intensity={0.8} color="#3b82f6" />

      <Core />
      <WireShell />

      {orbData.map((orb, i) => (
        <DistortOrb key={i} {...orb} />
      ))}

      <Particles />
    </>
  );
}

const HeroScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroScene;
