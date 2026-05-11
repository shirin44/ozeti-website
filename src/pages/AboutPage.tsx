import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StarFloat from '../components/StarFloat';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease, delay },
});

const TIMELINE_COLORS: Record<string, { accent: string; bg: string; borderL: string }> = {
  rouge: { accent: 'var(--rouge)', bg: 'var(--rouge-light)', borderL: '4px solid var(--rouge)' },
  jaune: { accent: 'var(--jaune)', bg: 'var(--jaune-light)', borderL: '4px solid var(--jaune)' },
  vert:  { accent: 'var(--vert)',  bg: 'var(--vert-light)',  borderL: '4px solid var(--vert)'  },
};

const VALUES_COLORS: Record<string, { accent: string; bg: string }> = {
  rouge: { accent: 'var(--rouge)', bg: 'var(--rouge-light)' },
  jaune: { accent: 'var(--jaune)', bg: 'var(--jaune-light)' },
  vert:  { accent: 'var(--vert)',  bg: 'var(--vert-light)'  },
};

function TrioStripe({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-0.75 ${className}`}>
      <div className="flex-1" style={{ background: 'var(--rouge)' }} />
      <div className="flex-1" style={{ background: 'var(--jaune)' }} />
      <div className="flex-1" style={{ background: 'var(--vert)' }} />
    </div>
  );
}

/* Placeholder-aware image: shows a styled slot if the image isn't loaded yet */
function AbImg({ src, alt, height, accent = 'var(--jaune)', borderTop }: {
  src: string; alt: string; height: string; accent?: string; borderTop?: string;
}) {
  const [err, setErr] = useState(false);
  const box: React.CSSProperties = {
    width: '100%', height, borderRadius: '1rem', overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(26,17,9,0.1)',
    borderTop: borderTop ?? `3px solid ${accent}`,
  };
  return (
    <div style={box}>
      {err ? (
        <div style={{
          width: '100%', height: '100%',
          background: 'var(--cream)',
          border: '2px dashed rgba(74,55,40,0.15)',
          borderTop: 'none',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            style={{ color: 'var(--muted)', opacity: 0.5 }}>
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-sans)' }}>
            {src.replace('/about/', '').replace('.jpg', '')}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      )}
    </div>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();

  const timeline = [
    { year: '2020', titleKey: 'about.tl.2020.title', descKey: 'about.tl.2020.desc', color: 'rouge' },
    { year: '2021', titleKey: 'about.tl.2021.title', descKey: 'about.tl.2021.desc', color: 'jaune' },
    { year: '2022', titleKey: 'about.tl.2022.title', descKey: 'about.tl.2022.desc', color: 'vert'  },
    { year: '2023', titleKey: 'about.tl.2023.title', descKey: 'about.tl.2023.desc', color: 'rouge' },
    { year: '2024', titleKey: 'about.tl.2024.title', descKey: 'about.tl.2024.desc', color: 'jaune' },
  ] as const;

  const values = [
    { titleKey: 'about.val1.title', descKey: 'about.val1.desc', color: 'rouge' },
    { titleKey: 'about.val2.title', descKey: 'about.val2.desc', color: 'jaune' },
    { titleKey: 'about.val3.title', descKey: 'about.val3.desc', color: 'vert'  },
  ] as const;

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─── Header ─── */}
      <section className="relative overflow-hidden pt-10 pb-24" style={{ background: 'var(--dark)' }}>
        <TrioStripe />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('about.breadcrumb')}</p>
            <h1 className="mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white' }}>{t('about.h1')}</h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{t('about.sub')}</p>
          </motion.div>
        </div>
        <div className="absolute right-10 bottom-0 font-display font-bold select-none pointer-events-none"
          style={{ fontSize: '18rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }} aria-hidden>★</div>
      </section>

      {/* ─── Who we are ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <motion.div {...fadeUp()}>
              <p className="small-caps mb-4" style={{ color: 'var(--rouge)' }}>{t('about.who.label')}</p>
              <h2 className="mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{t('about.who.h2')}</h2>
              <TrioStripe className="w-12 mb-8" />
              <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--mid)', fontWeight: 300 }}>{t('about.who.p1')}</p>
              <p className="leading-relaxed mb-5" style={{ color: 'var(--muted)', fontSize: '0.9375rem' }}>{t('about.who.p2')}</p>
              <p className="leading-relaxed" style={{ color: 'var(--muted)', fontSize: '0.9375rem' }}>{t('about.who.p3')}</p>
            </motion.div>

            {/* Right: photo + compact legal card */}
            <motion.div {...fadeUp(0.15)} className="flex flex-col gap-5">
              <AbImg src="/about/1.jpg" alt="OZETI — équipe" height="300px" accent="var(--rouge)" />
              <div className="grid grid-cols-2 gap-4">
                <AbImg src="/about/2.jpg" alt="OZETI — activités" height="180px" accent="var(--jaune)" />
                <AbImg src="/about/3.jpg" alt="OZETI — communauté" height="180px" accent="var(--vert)" />
              </div>
              {/* Compact legal strip */}
              <div className="rounded-xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-2"
                style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)', borderTop: '3px solid var(--jaune)' }}>
                {[
                  { label: 'Statut', value: 'NGO' },
                  { label: 'Enregistrement', value: 'MAST · N° STZ1-37440' },
                  { label: 'Fondée', value: '3 avril 2020' },
                  { label: 'Fondatrice', value: 'Rose Darline Chatelain' },
                  { label: 'Adresse', value: 'Gonaïves, Haïti' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="small-caps" style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--dark)' }}>{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { nKey: 'about.stat1.n', lKey: 'about.stat1.l', color: 'var(--rouge)' },
              { nKey: 'about.stat2.n', lKey: 'about.stat2.l', color: 'var(--jaune)' },
              { nKey: 'about.stat3.n', lKey: 'about.stat3.l', color: 'var(--vert)'  },
              { nKey: 'about.stat4.n', lKey: 'about.stat4.l', color: 'var(--rouge)' },
            ].map(({ nKey, lKey, color }, i) => (
              <motion.div key={lKey} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <p className="font-display font-bold mb-2" style={{ fontSize: '2.75rem', lineHeight: 1, color }}>
                  {t(nKey as Parameters<typeof t>[0])}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {t(lKey as Parameters<typeof t>[0])}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Photo mosaic ─── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="small-caps mb-3" style={{ color: 'var(--muted)' }}>{t('about.vision.label')}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{t('about.vision.h3')}</h2>
          </motion.div>

          {/* Mosaic: tall left + 2 stacked right */}
          <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16" {...fadeUp(0.1)}>
            <div className="md:col-span-7">
              <AbImg src="/about/4.jpg" alt="Vision OZETI" height="480px" accent="var(--rouge)" />
            </div>
            <div className="md:col-span-5 flex flex-col gap-4">
              <AbImg src="/about/5.jpg" alt="OZETI — terrain" height="228px" accent="var(--jaune)" />
              <AbImg src="/about/6.jpg" alt="OZETI — formation" height="228px" accent="var(--vert)" />
            </div>
          </motion.div>

          {/* Vision + Mission cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: t('about.vision.vlabel'), text: t('about.vision.v'), accent: 'var(--jaune)' },
              { label: t('about.vision.mlabel'), text: t('about.vision.m'), accent: 'var(--rouge)' },
            ].map(({ label, text, accent }, i) => (
              <motion.div
                key={label}
                className="p-7 rounded-2xl"
                style={{ background: 'white', borderLeft: `3px solid ${accent}`, boxShadow: '0 1px 8px rgba(26,17,9,0.06)' }}
                {...fadeUp(i * 0.1)}
              >
                <p className="small-caps mb-3" style={{ color: 'var(--muted)' }}>{label}</p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontWeight: 300 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="section-padding" style={{ background: 'var(--jaune-light)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div className="mb-16" {...fadeUp()}>
            <p className="small-caps mb-4" style={{ color: 'var(--muted)' }}>{t('about.timeline.label')}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{t('about.timeline.h2')}</h2>
          </motion.div>

          <div className="relative max-w-3xl">
            <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block" style={{ background: 'rgba(74,55,40,0.12)' }} />
            <div className="space-y-8">
              {timeline.map((item, i) => {
                const c = TIMELINE_COLORS[item.color];
                return (
                  <motion.div key={item.year} className="flex gap-10 items-start"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10 font-display font-bold text-sm"
                      style={{ background: c.bg, color: c.accent, border: `2px solid ${c.accent}` }}>
                      {item.year.slice(2)}
                    </div>
                    <div className="flex-1 rounded-xl p-6 mb-2" style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)', borderLeft: c.borderL }}>
                      <p className="small-caps mb-2" style={{ color: c.accent }}>{item.year}</p>
                      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--dark)' }}>
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t(item.descKey)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div className="mb-16 max-w-xl" {...fadeUp()}>
            <p className="small-caps mb-4" style={{ color: 'var(--muted)' }}>{t('about.values.label')}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{t('about.values.h2')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ titleKey, descKey, color }, i) => {
              const c = VALUES_COLORS[color];
              return (
                <motion.div key={titleKey} className="rounded-2xl overflow-hidden"
                  style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.65 }}>
                  {/* Photo slot per value */}
                  <AbImg
                    src={`/about/val${i + 1}.jpg`}
                    alt={t(titleKey)}
                    height="180px"
                    accent={c.accent}
                    borderTop="none"
                  />
                  <div className="p-6" style={{ borderTop: `3px solid ${c.accent}` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 font-display font-bold"
                      style={{ background: c.bg, color: c.accent }}>★</div>
                    <h3 className="font-display font-bold mb-3" style={{ fontSize: '1.15rem', color: 'var(--dark)' }}>{t(titleKey)}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t(descKey)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding" style={{ background: 'var(--cream)', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.div {...fadeUp()}>
            <div className="flex justify-center mb-6">
              <StarFloat color="#F5C518" delay={0} size={28} />
            </div>
            <h2 className="mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>{t('about.cta.h2')}</h2>
            <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--mid)', fontWeight: 300 }}>{t('about.cta.sub')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-primary">{t('about.cta.btn')} <ArrowRight size={15} /></button>
              </Link>
              <Link to="/programs">
                <button className="btn-outline-dark">{t('nav.programs')}</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
