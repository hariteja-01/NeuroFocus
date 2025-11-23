import { useEffect } from 'react';
import { useGesture } from '../context/GestureContext';
import { toast } from 'sonner';

const actions = [
  { id: 0, label: 'CALL NURSE', icon: '🏥' },
  { id: 1, label: 'MUSIC', icon: '🎵' },
  { id: 2, label: 'LIGHTS', icon: '💡' },
  { id: 3, label: 'MESSAGE', icon: '💬' },
];

// Keyboard fallback for testing when Edge Impulse is not available
export function useGestureSimulation() {
  const { focusedIndex, setFocusedIndex, setCurrentGesture, isSystemReady } = useGesture();

  useEffect(() => {
    console.log('ℹ️ Keyboard simulation active (Arrow keys + Enter)');
  }, []);

  useEffect(() => {
    if (!isSystemReady) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setCurrentGesture('UP');
          setFocusedIndex(Math.max(0, focusedIndex - 1));
          toast.info('Navigating UP', {
            icon: '⬆️',
            duration: 1000,
          });
          break;

        case 'ArrowDown':
          event.preventDefault();
          setCurrentGesture('DOWN');
          setFocusedIndex(Math.min(actions.length - 1, focusedIndex + 1));
          toast.info('Navigating DOWN', {
            icon: '⬇️',
            duration: 1000,
          });
          break;

        case 'Enter':
          event.preventDefault();
          setCurrentGesture('CLICK');
          const selectedAction = actions[focusedIndex];
          toast.success(`${selectedAction.icon} ${selectedAction.label} activated!`, {
            duration: 2000,
          });
          
          // Reset to IDLE after a short delay
          setTimeout(() => setCurrentGesture('IDLE'), 500);
          break;

        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        setTimeout(() => setCurrentGesture('IDLE'), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [focusedIndex, setFocusedIndex, setCurrentGesture, isSystemReady]);
}
