import { useEffect, useRef } from 'react';

const AnimatedConnections = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated connection lines
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
      ctx.lineWidth = 1;
      
      const cols = 3;
      const rows = 2;
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows; j++) {
          const x1 = (i + 0.5) * cellWidth;
          const y1 = (j + 0.5) * cellHeight;
          const x2 = (i + 1.5) * cellWidth;
          const y2 = (j + 0.5) * cellHeight;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Draw pulsing nodes
      offset += 0.02;
      const pulse = Math.sin(offset) * 0.5 + 0.5;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i + 0.5) * cellWidth;
          const y = (j + 0.5) * cellHeight;
          
          ctx.beginPath();
          ctx.arc(x, y, 3 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 41, 255, ${0.5 + pulse * 0.5})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedConnections;
