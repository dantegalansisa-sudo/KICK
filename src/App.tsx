import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollManager from './components/ScrollManager';
import { useLang } from './i18n';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const GetInvolved = lazy(() => import('./pages/GetInvolved'));
const RequestHelp = lazy(() => import('./pages/RequestHelp'));
const Donate = lazy(() => import('./pages/Donate'));
const Stories = lazy(() => import('./pages/Stories'));
const Contact = lazy(() => import('./pages/Contact'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();
  const { t } = useLang();

  return (
    <>
      <a href="#main" className="skip-link">{t.nav.skip}</a>
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/request-help" element={<RequestHelp />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
