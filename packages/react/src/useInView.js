/**
 * useInView - Intersection Observer to detect when element enters viewport.
 */

import { useState, useEffect, useRef } from "react";

/**
 * @param {object} [options]
 * @param {number} [options.threshold=0.1]
 * @param {string} [options.rootMargin='0px']
 * @returns {[import('react').RefObject<HTMLElement|null>, boolean]}
 */
export function useInView(options = {}) {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
