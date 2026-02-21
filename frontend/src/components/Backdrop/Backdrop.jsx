import { useEffect, useRef } from "react";
import "./backdrop.css";

const CELL_SIZE = 14;
const GAP = 12;
const ACTIVE_RATIO = 0.5;
const COLOR = { r: 255, g: 85, b: 69 }; //rgb(255, 85, 69)

function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

export default function Backdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
  
    let animationId;
    let cells = [];
  
    function initializeGrid() {
      const width = canvas.width;
      const height = canvas.height;
  
      const columns = Math.ceil(width / (CELL_SIZE + GAP));
      const rows = Math.ceil(height / (CELL_SIZE + GAP));
  
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const t = 1 - r / (rows - 1); // bottom=0, top=1
          cells.push({
            x: c * (CELL_SIZE + GAP),
            y: r * (CELL_SIZE + GAP),
            baseOpacity: 1 * Math.pow(1 - t, 3),
            glowDelta: 0.3 * Math.pow(1 - t, 3),
            active: Math.random() < ACTIVE_RATIO * (0.4 + t * 0.6),
            glowPhase: Math.random() * Math.PI * 2,
            driftPhase: Math.random() * Math.PI * 2,
          });
        }
      }
    }
  
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initializeGrid();
    }
  
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.003;
  
      cells.forEach((cell) => {
        const driftY = cell.active ? Math.sin(time * 0.2 + cell.driftPhase) * 1 : 0;
        const glow = cell.active ? Math.sin(time * 2 + cell.glowPhase) * cell.glowDelta : 0;
        const alpha = Math.min(cell.baseOpacity + glow, 1);
  
        ctx.fillStyle = `rgba(${COLOR.r},${COLOR.g},${COLOR.b},${alpha})`;
        const radius = 2; // in pixels, adjust as you like
        drawRoundedRect(
          ctx,
          cell.x,
          cell.y + driftY,
          CELL_SIZE,
          CELL_SIZE,
          radius,
          `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${alpha})`
        );
      });
  
      animationId = requestAnimationFrame(animate);
    }
  
    animate();
  
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="backdrop-canvas" />;
}