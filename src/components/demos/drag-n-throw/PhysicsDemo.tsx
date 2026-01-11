import { useEffect, useRef } from "react";
import initPhysics from "./engine";

const PhysicsDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const cleanup = initPhysics(canvasRef.current);

    return cleanup;
  }, []);

  return <canvas ref={canvasRef} />;
};

export default PhysicsDemo;
