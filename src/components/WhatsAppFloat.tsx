import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { whatsappLink } from '../data/site';
import Icon from './Icon';

export default function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <motion.a
      href={whatsappLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label={t.whatsapp.label}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <Icon name="whatsapp" size={30} />
      <span className="wa-float__label">{t.whatsapp.label}</span>
    </motion.a>
  );
}
