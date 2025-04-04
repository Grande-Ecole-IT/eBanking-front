/* eslint-disable no-unused-vars */
import { Float, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";

function FloatingCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.2}
          emissive="#60a5fa"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function DigitalWave() {
  const meshRef = useRef();
  const count = 500;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, -2]}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {">_"}
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#60a5fa"
          emissiveIntensity={0.5}
        />
      </Text3D>
    </group>
  );
}

export default function MainLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-50/90 backdrop-blur-sm"
    >
      <div className="h-64 w-64 relative">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} color="#bfdbfe" />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
          <Suspense fallback={null}>
            <FloatingCube />
            <DigitalWave />
          </Suspense>
          <OrbitControls enabled={false} />
        </Canvas>
      </div>

      <motion.h3
        className="mt-6 text-xl font-semibold text-blue-600"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Initialisation du système
      </motion.h3>

      <motion.div
        className="mt-4 w-48 h-1.5 bg-blue-100 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="h-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300" />
      </motion.div>

      <motion.p
        className="mt-4 text-sm text-blue-400"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Veuillez patienter...
      </motion.p>
    </motion.div>
  );
}
