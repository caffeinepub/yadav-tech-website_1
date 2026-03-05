import { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
        
        offset += isMobile ? 0.3 : 0.5;
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 1;
        
        const gridSize = isMobile ? 40 : 50;
        
        // Vertical lines
        for (let x = (offset % gridSize) - gridSize; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = (offset % gridSize) - gridSize; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
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
    <>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/assets/generated/ai-grid-bg.dim_1920x1080.png)' }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: isMobile ? 0.2 : 0.3 }}
      />
    </>
  );
};

export default AnimatedBackground;
