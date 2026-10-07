import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow, RevealText } from './motion';
import { EASE } from '../motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}

// Encabezado editorial de páginas internas (fondo claro, sello giratorio).
export default function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="container page-header__grid">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <RevealText as="h1" text={title} className="h1" immediate delay={0.15} />
        </div>
        <motion.div
          className="page-header__side"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE.smooth }}
        >
          <p className="lead">{intro}</p>
          {children}
        </motion.div>
      </div>
      <Seal />
    </section>
  );
}

export function Seal({ className = '' }: { className?: string }) {
  return (
    <div className={`seal ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#seal-circle">TAKE THE INITIATIVE · KICH · SALUD COMUNITARIA · </textPath>
        </text>
      </svg>
      <span className="seal__core">
        <svg viewBox="0 0 24 24" width="30" height="30">
          <path d="M12 21v-9M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
