import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import ChipModel from './ChipModel';

const ChipScene = () => {
  return (
    <div className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[4, 2, 4]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          color="#3b82f6"
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={0.8}
          color="#06b6d4"
        />
        <pointLight 
          position={[0, 5, 0]} 
          intensity={0.6}
          color="#a855f7"
        />
        
        <Environment preset="night" />
        
        <Suspense fallback={null}>
          <ChipModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ChipScene;