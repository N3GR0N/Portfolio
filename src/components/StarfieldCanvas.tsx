import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize stars
    const STAR_COUNT = Math.min(140, Math.floor((width * height) / 12000));
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX = mouseRef.current.x * 25;
      const offsetY = mouseRef.current.y * 25;

      // Draw celestial coordinates / faint radial nebula glow
      const radialGradient = ctx.createRadialGradient(
        centerX + offsetX * 1.5,
        centerY * 0.5 + offsetY,
        50,
        centerX,
        centerY,
        width * 0.8
      );
      radialGradient.addColorStop(0, 'rgba(99, 102, 241, 0.07)');
      radialGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      radialGradient.addColorStop(1, 'rgba(9, 10, 15, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw faint constellation lines between nearby stars
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)';
      ctx.lineWidth = 0.5;

      const screenStars: { x: number; y: number; brightness: number; size: number }[] = [];

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Slowly drift stars towards viewer
        star.z -= 0.3;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 400 / star.z;
        const px = star.x * k + centerX + offsetX * (1 - star.z / 1000);
        const py = star.y * k + centerY + offsetY * (1 - star.z / 1000);

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.sin(time * star.twinkleSpeed * 100 + i) * 0.3 + 0.7;
          const currentBrightness = star.brightness * alpha * (1 - star.z / 1200);

          screenStars.push({ x: px, y: py, brightness: currentBrightness, size: star.size });

          // Draw star
          ctx.beginPath();
          ctx.arc(px, py, star.size * (1 - star.z / 1200) + 0.2, 0, Math.PI * 2);
          
          if (i % 7 === 0) {
            // Indigo accent stars
            ctx.fillStyle = `rgba(165, 180, 252, ${currentBrightness})`;
          } else if (i % 11 === 0) {
            // Cyan accent stars
            ctx.fillStyle = `rgba(56, 189, 248, ${currentBrightness * 0.9})`;
          } else {
            // Crisp white stars
            ctx.fillStyle = `rgba(241, 245, 249, ${currentBrightness * 0.85})`;
          }
          ctx.fill();
        }
      }

      // Draw faint connections between closest nodes
      for (let i = 0; i < screenStars.length; i++) {
        for (let j = i + 1; j < screenStars.length; j++) {
          const dx = screenStars[i].x - screenStars[j].x;
          const dy = screenStars[i].y - screenStars[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 7000) {
            const opacity = (1 - distSq / 7000) * 0.12;
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(screenStars[i].x, screenStars[i].y);
            ctx.lineTo(screenStars[j].x, screenStars[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
