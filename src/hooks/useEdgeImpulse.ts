import { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useGesture } from '../context/GestureContext';
// @ts-ignore
import { EdgeImpulseClassifier } from '../utils/edge-impulse-wrapper';

// Declare the Edge Impulse classifier type on window
declare global {
  interface Window {
    EdgeImpulseClassifier?: any; // Provided by edge-impulse-standalone.js
    Module?: any;
  }
}

// Model input dimensions (adjust if your model differs)
const MODEL_WIDTH = 96;
const MODEL_HEIGHT = 96;
const CLASSIFICATION_THRESHOLD = 0.85;

// Dynamically load the Edge Impulse script if not present
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

export function useEdgeImpulse(videoRef: React.RefObject<Webcam>) {
  const [gesture, setGesture] = useState<string>('IDLE');
  const classifierRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setCurrentGesture, setResults } = useGesture();

  // Helper function to convert canvas to features array for Edge Impulse
  const getFeaturesFromCanvas = (ctx: CanvasRenderingContext2D): number[] => {
    const imageData = ctx.getImageData(0, 0, MODEL_WIDTH, MODEL_HEIGHT);
    const { data } = imageData;
    const features: number[] = [];
    // Loop through RGBA data (4 values per pixel)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Convert to RGB Hex integer (0xRRGGBB) for Edge Impulse
      features.push((r << 16) | (g << 8) | b);
    }
    return features;
  };

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        await loadScript('/edge-impulse-standalone.js');

        // Initialize EdgeImpulseClassifier from our wrapper
        classifierRef.current = new EdgeImpulseClassifier();
        await classifierRef.current.init();

        // Create hidden canvas for processing
        canvasRef.current = document.createElement('canvas');
        canvasRef.current.width = MODEL_WIDTH;
        canvasRef.current.height = MODEL_HEIGHT;
        
        console.log('Classifier initialized successfully');
        loop();
      } catch (err) {
        console.error('Failed to initialize Edge Impulse classifier:', err);
      }
    }

    async function loop() {
      if (cancelled) return;
      
      const videoEl = videoRef.current?.video as HTMLVideoElement | undefined;
      if (!classifierRef.current || !videoEl || videoEl.readyState !== 4 || !canvasRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        try {
          // Draw video frame onto canvas
          ctx.drawImage(videoEl, 0, 0, MODEL_WIDTH, MODEL_HEIGHT);
          
          // Get features from canvas
          const features = getFeaturesFromCanvas(ctx);
          
          // Run classification with features array
          const result = await classifierRef.current.classify(features);
          
          // Debug logging - show real-time probabilities
          if (result && result.results && result.results.length > 0) {
             // console.log(result.results[0].label, result.results[0].value);
          }

          // Process results
          if (result && result.results && Array.isArray(result.results)) {
            const candidates = result.results;
            setResults(candidates); // Update context with raw results
            candidates.sort((a: any, b: any) => (b.value || 0) - (a.value || 0));
            const top = candidates[0];
            
            let newGesture = 'IDLE';
            if (top && (top.value || 0) >= CLASSIFICATION_THRESHOLD) {
              const lbl = top.label.toLowerCase();
              if (lbl.includes('up')) newGesture = 'UP';
              else if (lbl.includes('down')) newGesture = 'DOWN';
              else if (lbl.includes('click')) newGesture = 'CLICK';
            }
            
            if (newGesture !== gesture) {
              setGesture(newGesture);
              setCurrentGesture(newGesture);
            }
          }
        } catch (e) {
          console.error('Classification error:', e);
        }
      }
      
      rafRef.current = requestAnimationFrame(loop);
    }

    init();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef, setCurrentGesture, gesture]);

  return gesture;
}
