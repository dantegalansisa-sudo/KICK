import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 60) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);
  return { ref, y };
}
