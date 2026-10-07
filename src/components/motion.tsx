import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'framer-motion';
import { useParallax } from '../hooks/useParallax';
import { useLang } from '../i18n';
import { EASE, fadeUp } from '../motion';

/* ---------- Rich: *texto* → <em> ---------- */

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

/* ---------- RevealText: máscara palabra por palabra ---------- */

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p';

const wordVariants: Variants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: EASE.premium } },
};

// glue = la palabra va pegada a la anterior (p. ej. "*apoyo*?").
function tokenize(text: string) {
  const tokens: { word: string; italic: boolean; glue: boolean }[] = [];
  let prevEndsWithSpace = true;
  text.split(/(\*[^*]+\*)/g).filter(Boolean).forEach((chunk) => {
    const italic = chunk.startsWith('*') && chunk.endsWith('*');
    const clean = italic ? chunk.slice(1, -1) : chunk;
    const startsWithSpace = /^\s/.test(clean);
    clean.split(/\s+/).filter(Boolean).forEach((word, j) =>
      tokens.push({ word, italic, glue: j === 0 && tokens.length > 0 && !startsWithSpace && !prevEndsWithSpace }),
    );
    prevEndsWithSpace = /\s$/.test(clean);
  });
  return tokens;
}

interface RevealTextProps {
  text: string;
  as?: HeadingTag;
  className?: string;
  delay?: number;
  immediate?: boolean;
  id?: string;
}

export function RevealText({ text, as = 'h2', className = '', delay = 0, immediate = false, id }: RevealTextProps) {
  const Tag = as;
  const tokens = tokenize(text);
  const plain = text.replace(/\*/g, '');
  const trigger = immediate
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={`reveal-text ${className}`} id={id}>
      <span className="sr-only">{plain}</span>
      <motion.span
        key={text}
        aria-hidden="true"
        className="reveal-text__inner"
        variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
        {...trigger}
      >
        {tokens.map((tk, i) => (
          <Fragment key={i}>
            <span className="mask">
              <motion.span className="mask__word" variants={wordVariants}>
                {tk.italic ? <em>{tk.word}</em> : tk.word}
              </motion.span>
            </span>
            {i < tokens.length - 1 && !tokens[i + 1].glue ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ---------- Reveal: fade-up genérico ---------- */

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'aside';
}) {
  const M = motion[as];
  const variants: Variants = delay
    ? { hidden: fadeUp.hidden, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.smooth, delay } } }
    : fadeUp;
  return (
    <M
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </M>
  );
}

/* ---------- MagneticButton ---------- */

interface MagneticProps {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  strength?: number;
  ariaLabel?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  to,
  href,
  onClick,
  type = 'button',
  strength = 0.3,
  ariaLabel,
  disabled,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const external = href && /^https?:/.test(href);
  const inner = to ? (
    <Link to={to} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  ) : href ? (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  ) : (
    <button type={type} className={className} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </button>
  );

  return (
    <motion.span className="magnetic" style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset}>
      {inner}
    </motion.span>
  );
}

/* ---------- AnimatedCounter ---------- */

export function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  const formatted = new Intl.NumberFormat(lang === 'es' ? 'es-DO' : 'en-US').format(value);
  return (
    <span ref={ref} className="counter" aria-label={`${target}${suffix}`}>
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------- ParallaxImage ---------- */

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
  priority?: boolean;
}

export function ParallaxImage({ src, alt, className = '', distance = 40, priority = false }: ParallaxImageProps) {
  const { ref, y } = useParallax<HTMLDivElement>(distance);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  // Cortina que se retira al entrar en pantalla.
  return (
    <motion.div
      ref={ref}
      className={`parallax ${className}`}
      initial={reduce ? 'visible' : 'hidden'}
      animate={inView || reduce ? 'visible' : 'hidden'}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ y, scale: 1.14 }}
      />
      <motion.span
        className="parallax__curtain"
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 1 },
          visible: { scaleY: 0, transition: { duration: 1.25, ease: EASE.premium } },
        }}
      />
    </motion.div>
  );
}

/* ---------- Eyebrow + SectionHead ---------- */

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow${light ? ' eyebrow--light' : ''}`}>{children}</span>;
}

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  layout?: 'split' | 'stack' | 'center';
  as?: HeadingTag;
}

export function SectionHead({ eyebrow, title, intro, action, layout = 'split', as = 'h2' }: SectionHeadProps) {
  return (
    <div className={`section-head section-head--${layout}`}>
      <div className="section-head__main">
        <Eyebrow>{eyebrow}</Eyebrow>
        <RevealText as={as} text={title} className="h2" />
      </div>
      {(intro || action) && (
        <Reveal className="section-head__side" delay={0.15}>
          {intro && <p className="lead">{intro}</p>}
          {action}
        </Reveal>
      )}
    </div>
  );
}
