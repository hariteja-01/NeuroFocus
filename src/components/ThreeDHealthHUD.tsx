import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense } from 'react';

function RotatingHeart() {
  // Placeholder: Replace with a real 3D heart model
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={0.5} wireframe />
    </mesh>
  );
}

export function ThreeDHealthHUD() {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden shadow-hud bg-hud-gradient border border-neon-blue/30">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <RotatingHeart />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
