import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  speed: number;
  isAmber?: boolean;
}

export const CosmicGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create subtle particles
    const particleCount = Math.min(80, Math.floor((width * height) / 16000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.45 + 0.15,
        speed: Math.random() * 0.3 + 0.1,
        isAmber: i % 4 === 0,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x * 20;
      const my = mouseRef.current.y * 20;

      // Draw faint warm bronze ambient vignette
      const radial = ctx.createRadialGradient(
        width * 0.5 + mx,
        height * 0.35 + my,
        50,
        width * 0.5,
        height * 0.4,
        width * 0.75
      );
      radial.addColorStop(0, 'rgba(217, 119, 6, 0.045)');
      radial.addColorStop(0.5, 'rgba(180, 83, 9, 0.015)');
      radial.addColorStop(1, 'rgba(11, 11, 12, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Render technical reticle crosshairs & faint grid lines
      const gridSize = 80;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(255, 245, 235, 0.02)';

      const startX = (mx * 0.5) % gridSize;
      const startY = (my * 0.5) % gridSize;

      ctx.beginPath();
      for (let x = startX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = startY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render celestial coordinate nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed * 0.3;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        const px = p.x + mx * (p.size * 0.5);
        const py = p.y + my * (p.size * 0.5);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);

        if (p.isAmber) {
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.8})`;
        } else {
          ctx.fillStyle = `rgba(231, 229, 228, ${p.alpha * 0.5})`;
        }
        ctx.fill();

        // Connect close particles with delicate warm lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = px - (p2.x + mx * (p2.size * 0.5));
          const dy = py - (p2.y + my * (p2.size * 0.5));
          const distSq = dx * dx + dy * dy;
          if (distSq < 5000) {
            const lineAlpha = (1 - distSq / 5000) * 0.06;
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2.x + mx * (p2.size * 0.5), p2.y + my * (p2.size * 0.5));
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
