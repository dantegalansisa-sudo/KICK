import type { Variants } from 'framer-motion';

export const EASE = {
  premium: [0.76, 0, 0.24, 1] as const,
  smooth: [0.22, 1, 0.36, 1] as const,
};

export const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const gridItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.smooth } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.smooth } },
};
