import { useEffect, useRef, useState } from 'react';

const AnimatedConnections = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw animated connection lines with reduced complexity on mobile
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 1;
        
        const cols = isMobile ? 2 : 3;
        const rows = 2;
        const cellWidth = canvas.width / cols;
        const cellHeight = canvas.height / rows;

        // Draw fewer lines on mobile
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
        offset += isMobile ? 0.015 : 0.02;
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
        
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedConnections;
