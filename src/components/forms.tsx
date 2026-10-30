import { useState, type ChangeEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import Icon from './Icon';
import { EASE } from '../motion';

/* ---------- Estado + validación simple ---------- */

type Values = Record<string, string>;

export function useForm<T extends Values>(initial: T) {
  const { t } = useLang();
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const bind = (key: keyof T) => ({
    value: values[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  const setValue = (key: keyof T, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (required: (keyof T)[], emails: (keyof T)[] = []) => {
    const next: Partial<Record<keyof T, string>> = {};
    required.forEach((k) => {
      if (!String(values[k] ?? '').trim()) next[k] = t.common.required;
    });
    emails.forEach((k) => {
      const v = String(values[k] ?? '').trim();
      if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[k] = t.common.invalidEmail;
    });
    setErrors(next);
    const firstKey = Object.keys(next)[0];
    if (firstKey) document.getElementById(`f-${firstKey}`)?.focus();
    return !firstKey;
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
  };

  return { values, errors, bind, setValue, validate, reset };
}

/* ---------- Campos ---------- */

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, error, optional, children, className = '' }: FieldProps) {
  const { t } = useLang();
  return (
    <div className={`field${error ? ' field--error' : ''} ${className}`}>
      <label htmlFor={`f-${id}`}>
        {label}
        {optional && <span className="field__opt"> ({t.common.optional})</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            id={`f-${id}-err`}
            className="field__error"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export const fieldA11y = (id: string, error?: string) => ({
  id: `f-${id}`,
  name: id,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `f-${id}-err` : undefined,
});

export function Select({
  options,
  placeholder,
  ...rest
}: { options: string[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="select">
      <select {...rest}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ---------- Chips (radio / checkbox reales, estilizados) ---------- */

interface ChipsProps {
  name: string;
  legend: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  error?: string;
}

export function Chips({ name, legend, options, value, onChange, multiple = false, error }: ChipsProps) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const toggle = (opt: string) => {
    if (!multiple) return onChange(opt);
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };
  return (
    <fieldset className={`chips${error ? ' field--error' : ''}`}>
      <legend>{legend}</legend>
      <div className="chips__list">
        {options.map((opt, i) => {
          const id = i === 0 ? `f-${name}` : `${name}-${i}`;
          const checked = selected.includes(opt);
          return (
            <label key={opt} htmlFor={id} className={`chip${checked ? ' is-checked' : ''}`}>
              <input
                id={id}
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                checked={checked}
                onChange={() => toggle(opt)}
              />
              {checked && <Icon name="check" size={14} strokeWidth={2} />}
              {opt}
            </label>
          );
        })}
      </div>
      {error && (
        <span className="field__error" role="alert">
          {error}
        </span>
      )}
    </fieldset>
  );
}

/* ---------- Éxito ---------- */

export function FormSuccess({ title, text, onReset, resetLabel }: { title: string; text: string; onReset?: () => void; resetLabel?: string }) {
  return (
    <motion.div
      className="form-success"
      role="status"
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE.smooth }}
    >
      <motion.span
        className="form-success__icon"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 14 }}
      >
        <Icon name="check" size={30} strokeWidth={2} />
      </motion.span>
      <h3>{title}</h3>
      <p>{text}</p>
      {onReset && resetLabel && (
        <button type="button" className="btn btn--outline btn--sm" onClick={onReset}>
          {resetLabel}
        </button>
      )}
    </motion.div>
  );
}

/* ---------- Envío real (Resend vía /api/forms) ---------- */

export type FormKind = 'contact' | 'volunteer' | 'request' | 'newsletter';

// Campo trampa invisible: las personas no lo ven ni lo llenan; los bots sí.
export function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function useSubmit(kind: FormKind) {
  const { lang, t } = useLang();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const send = async (data: Record<string, unknown>, formEl?: HTMLFormElement | null) => {
    setSending(true);
    setError('');
    try {
      const website = (formEl?.querySelector<HTMLInputElement>('input[name="website"]')?.value ?? '').trim();
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: kind, lang, data, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      return true;
    } catch {
      setError(t.common.sendError);
      return false;
    } finally {
      setSending(false);
    }
  };

  return { send, sending, error };
}

export function SendError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <Icon name="shield" size={16} /> {message}
    </p>
  );
}
