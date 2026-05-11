import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallery from '../data/gallery';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function TrioStripe() {
  return (
    <div className="flex h-[3px] w-full">
      <div className="flex-1" style={{ background: 'var(--rouge)' }} />
      <div className="flex-1" style={{ background: 'var(--jaune)' }} />
      <div className="flex-1" style={{ background: 'var(--vert)' }} />
    </div>
  );
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  const close  = useCallback(() => setSelected(null), []);
  const prev   = useCallback(() => setSelected((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)), []);
  const next   = useCallback(() => setSelected((i) => (i === null ? null : (i + 1) % gallery.length)), []);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close, prev, next]);

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─── Header ─── */}
      <section className="relative overflow-hidden pt-10 pb-24" style={{ background: 'var(--dark)' }}>
        <TrioStripe />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {t('gallery.breadcrumb')}
            </p>
            <h1 className="mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white' }}>
              {t('gallery.h1')}
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
              {t('gallery.sub')}
            </p>
          </motion.div>
        </div>
        <div
          className="absolute right-10 bottom-0 font-display font-bold select-none pointer-events-none"
          style={{ fontSize: '18rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
          aria-hidden
        >
          ★
        </div>
      </section>

      {/* ─── Masonry grid ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            style={{
              columns: 'auto',
              columnWidth: '280px',
              columnGap: '1rem',
            }}
          >
            {gallery.map((img, i) => (
              <motion.div
                key={img.file}
                className="mb-4 break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: (i % 6) * 0.05 }}
                onClick={() => setSelected(i)}
              >
                <img
                  src={`/gallery/${img.file}`}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  style={{ borderRadius: '0.75rem' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: 'linear-gradient(to top, rgba(26,17,9,0.55) 0%, transparent 60%)' }}
                >
                  <span className="small-caps text-white" style={{ fontSize: '0.65rem' }}>
                    {t('gallery.photo')} {i + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0" style={{ background: 'rgba(26,17,9,0.94)' }} />

            {/* Controls */}
            <button
              className="absolute top-5 right-5 z-10 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={close}
              aria-label={t('gallery.close')}
            >
              <X size={26} />
            </button>
            <button
              className="absolute left-3 sm:left-6 z-10 p-3 rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={t('gallery.prev')}
            >
              <ChevronLeft size={30} />
            </button>
            <button
              className="absolute right-3 sm:right-6 z-10 p-3 rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t('gallery.next')}
            >
              <ChevronRight size={30} />
            </button>

            {/* Image */}
            <motion.div
              key={selected}
              className="relative z-10 flex flex-col items-center px-16"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/gallery/${gallery[selected].file}`}
                alt={gallery[selected].alt}
                style={{
                  maxHeight: '82vh',
                  maxWidth: '90vw',
                  objectFit: 'contain',
                  borderRadius: '0.75rem',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                }}
              />
              <p className="small-caps mt-4" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                {t('gallery.photo')} {selected + 1} {t('gallery.of')} {gallery.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
