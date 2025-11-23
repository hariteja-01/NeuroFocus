import { useEffect, useState, forwardRef } from 'react';
import Webcam from 'react-webcam';

export const CameraFeed = forwardRef<Webcam, Record<string, never>>((_, ref) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  if (hasPermission === false) {
    return (
      <div className="relative w-full h-full bg-slate-900 rounded-lg flex items-center justify-center border-2 border-[#00ff9d]">
        <p className="text-[#00ff9d] text-lg">Camera access denied</p>
      </div>
    );
  }

  if (hasPermission === null) {
    return (
      <div className="relative w-full h-full bg-slate-900 rounded-lg flex items-center justify-center border-2 border-[#00ff9d]">
        <p className="text-[#00ff9d] text-lg">Requesting camera access...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-[#00ff9d] shadow-[0_0_20px_rgba(0,255,157,0.3)]">
      <Webcam
        ref={ref}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'user',
          width: 640,
          height: 480,
        }}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-slate-950/80 px-4 py-2 rounded-md border border-[#00ff9d]">
        <p className="text-[#00ff9d] font-mono text-sm">CAMERA ACTIVE</p>
      </div>
      <div className="absolute top-4 right-4 bg-slate-950/80 px-4 py-2 rounded-md border border-[#00ff9d]">
        <p className="text-[#00ff9d] font-mono text-sm">AI DETECTION</p>
      </div>
    </div>
  );
});

CameraFeed.displayName = 'CameraFeed';
