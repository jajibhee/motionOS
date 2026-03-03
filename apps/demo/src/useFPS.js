import { useState, useRef, useLayoutEffect } from "react";

/**
 * @returns {{ fps: number; frameDrops: number }}
 */
export function useFPS() {
  const [fps, setFPS] = useState(60);
  const [frameDrops, setFrameDrops] = useState(0);
  const frameTimes = useRef([]);
  const lastTime = useRef(performance.now());
  const rafId = useRef(null);

  useLayoutEffect(() => {
    const tick = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      lastTime.current = now;

      frameTimes.current.push(delta);
      if (frameTimes.current.length > 60) {
        frameTimes.current.shift();
      }

      const avg = frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
      const currentFps = avg > 0 ? Math.round(1000 / avg) : 60;
      setFPS(Math.min(60, currentFps));

      if (delta > 20) {
        setFrameDrops((d) => d + 1);
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return { fps, frameDrops };
}
