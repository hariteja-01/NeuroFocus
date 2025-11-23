import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface GestureContextType {
  currentGesture: string;
  focusedIndex: number;
  isSystemReady: boolean;
  results: Array<{ label: string; value: number }>;
  setCurrentGesture: (gesture: string) => void;
  setFocusedIndex: (index: number) => void;
  setIsSystemReady: (ready: boolean) => void;
  setResults: (results: Array<{ label: string; value: number }>) => void;
}

const GestureContext = createContext<GestureContextType | undefined>(undefined);

export function GestureProvider({ children }: { children: ReactNode }) {
  const [currentGesture, setCurrentGesture] = useState<string>('IDLE');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isSystemReady, setIsSystemReady] = useState<boolean>(false);
  const [results, setResults] = useState<Array<{ label: string; value: number }>>([]);

  useEffect(() => {
    // Simulate system initialization
    const timer = setTimeout(() => {
      setIsSystemReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureContext.Provider
      value={{
        currentGesture,
        focusedIndex,
        isSystemReady,
        results,
        setCurrentGesture,
        setFocusedIndex,
        setIsSystemReady,
        setResults,
      }}
    >
      {children}
    </GestureContext.Provider>
  );
}

export function useGesture() {
  const context = useContext(GestureContext);
  if (context === undefined) {
    throw new Error('useGesture must be used within a GestureProvider');
  }
  return context;
}
