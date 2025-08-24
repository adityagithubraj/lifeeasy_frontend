import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ChipModel = () => {
  const chipRef = useRef<THREE.Group>(null);
  const componentsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (chipRef.current) {
      chipRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      chipRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (componentsRef.current) {
      componentsRef.current.rotation.y = state.clock.elapsedTime * -0.3;
    }
  });

  return (
    <group ref={chipRef}>
      {/* Main Chip Base */}
      <Box args={[2, 0.2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#0f172a"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Circuit Components */}
      <group ref={componentsRef}>
        {/* Central Processing Unit */}
        <Box args={[0.8, 0.15, 0.8]} position={[0, 0.175, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </Box>

        {/* Memory Banks */}
        {Array.from({ length: 4 }, (_, i) => (
          <Box 
            key={i} 
            args={[0.3, 0.1, 0.3]} 
            position={[
              Math.cos((i * Math.PI) / 2) * 1.2,
              0.15,
              Math.sin((i * Math.PI) / 2) * 1.2
            ]}
          >
            <meshStandardMaterial 
              color="#06b6d4" 
              metalness={0.7} 
              roughness={0.3}
              emissive="#06b6d4"
              emissiveIntensity={0.2}
            />
          </Box>
        ))}

        {/* Corner Capacitors */}
        {Array.from({ length: 4 }, (_, i) => (
          <Sphere 
            key={i} 
            args={[0.08]} 
            position={[
              (i % 2 === 0 ? 1 : -1) * 0.9,
              0.12,
              (i < 2 ? 1 : -1) * 0.9
            ]}
          >
            <meshStandardMaterial 
              color="#a855f7" 
              metalness={0.6} 
              roughness={0.4}
              emissive="#a855f7"
              emissiveIntensity={0.4}
            />
          </Sphere>
        ))}

        {/* Connection Lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <Box 
            key={i} 
            args={[0.02, 0.05, 0.6]} 
            position={[
              Math.cos((i * Math.PI) / 4) * 0.4,
              0.125,
              Math.sin((i * Math.PI) / 4) * 0.4
            ]}
            rotation={[0, (i * Math.PI) / 4, 0]}
          >
            <meshStandardMaterial 
              color="#fbbf24" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#fbbf24"
              emissiveIntensity={0.3}
            />
          </Box>
        ))}
      </group>

      {/* Heat Sink */}
      <Box args={[2.4, 0.05, 2.4]} position={[0, 0.3, 0]}>
        <meshStandardMaterial 
          color="#6b7280" 
          metalness={0.8} 
          roughness={0.2}
        />
      </Box>

      {/* Heat Sink Fins */}
      {Array.from({ length: 5 }, (_, i) => (
        <Box 
          key={i} 
          args={[2.2, 0.4, 0.05]} 
          position={[0, 0.5, (i - 2) * 0.4]}
        >
          <meshStandardMaterial 
            color="#9ca3af" 
            metalness={0.7} 
            roughness={0.3}
          />
        </Box>
      ))}
    </group>
  );
};

export default ChipModel;