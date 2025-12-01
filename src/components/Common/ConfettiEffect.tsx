import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  type?: 'basic' | 'fireworks' | 'stars';
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, type = 'basic' }) => {
  useEffect(() => {
    if (!trigger) return;

    const duration = 3000;
    const end = Date.now() + duration;

    if (type === 'basic') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#22c55e', '#f59e0b', '#ef4444'],
      });
    } else if (type === 'fireworks') {
      const colors = ['#6366f1', '#a855f7', '#22c55e'];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    } else if (type === 'stars') {
      const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'] as confetti.Shape[],
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
      };

      const shoot = () => {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ['star'] as confetti.Shape[],
        });

        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ['circle'] as confetti.Shape[],
        });
      };

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    }
  }, [trigger, type]);

  return null;
};

export default ConfettiEffect;
