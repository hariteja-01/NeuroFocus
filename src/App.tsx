import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { GestureProvider, useGesture } from './context/GestureContext';
import { CameraFeed } from './components/CameraFeed';
import { ActionGrid } from './components/ActionGrid';
import { useEdgeImpulse } from './hooks/useEdgeImpulse';
import { useGestureSimulation } from './hooks/useGestureSimulation';
import { toast, Toaster } from 'sonner';
import { HUDLayout } from './layouts/HUDLayout';


const actions = [
  { id: 0, label: 'CALL NURSE', icon: '🏥' },
  { id: 1, label: 'MUSIC', icon: '🎵' },
  { id: 2, label: 'LIGHTS', icon: '💡' },
  { id: 3, label: 'MESSAGE', icon: '💬' },
];


function AppContent() {
  const webcamRef = useRef<Webcam>(null);
  useEdgeImpulse(webcamRef);
  useGestureSimulation();

  // You can pass gesture logic, camera, and overlays as children or context
  return (
    <HUDLayout>
      <div className="w-full flex flex-col gap-8">
        <CameraFeed ref={webcamRef} />
        <ActionGrid />
      </div>
      <Toaster 
        theme="dark" 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0f172a',
            border: '2px solid #00ff9d',
            color: '#00ff9d',
          },
        }}
      />
    </HUDLayout>
  );
}

function App() {
  return (
    <GestureProvider>
      <AppContent />
    </GestureProvider>
  );
}

export default App;
