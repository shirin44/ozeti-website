import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function NotFoundPage() {
  const navigate  = useNavigate();
  const { lang }  = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: '80svh', background: 'var(--cream)' }}
    >
      {/* Trio stripe accent */}
      <motion.div
        className="flex mb-12"
        style={{ height: '3px', width: '80px' }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="flex-1" style={{ background: 'var(--rouge)' }} />
        <div className="flex-1" style={{ background: 'var(--jaune)' }} />
        <div className="flex-1" style={{ background: 'var(--vert)' }} />
      </motion.div>

      <motion.p
        className="small-caps mb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
      >
        404
      </motion.p>

      <motion.h1
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--dark)', marginBottom: '1rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
      >
        {lang === 'fr' ? 'Page introuvable' : 'Page not found'}
      </motion.h1>

      <motion.p
        style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '26rem', marginBottom: '2.5rem', fontWeight: 300 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
      >
        {lang === 'fr'
          ? 'Cette page n'existe pas. Vous serez redirigé·e vers l'accueil dans quelques secondes.'
          : 'This page doesn't exist. You'll be redirected to the home page in a few seconds.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
      >
        <Link to="/">
          <button className="btn-primary">
            <ArrowLeft size={15} />
            {lang === 'fr' ? 'Retour à l'accueil' : 'Back to home'}
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
