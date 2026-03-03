import { useRef } from "react";

/**
 * @returns {{ count: number; increment: () => void }}
 */
export function useRenderCount() {
  const count = useRef(0);
  count.current += 1;
  return {
    count: count.current,
    increment: () => {},
  };
}
