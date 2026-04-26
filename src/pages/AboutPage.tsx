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
            <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>{t('about.breadcrumb')}</p>
            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{t('about.h1')}</h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{t('about.sub')}</p>
          </motion.div>
        </div>
        <div className="absolute right-10 bottom-0 font-display font-bold select-none pointer-events-none" style={{ fontSize: '18rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }} aria-hidden>★</div>
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

            {/* Legal card */}
            <motion.div {...fadeUp(0.15)}>
              <div className="rounded-2xl p-8" style={{ background: 'white', boxShadow: '0 2px 20px rgba(26,17,9,0.06)', borderTop: '3px solid var(--jaune)' }}>
                <p className="small-caps mb-7" style={{ color: 'var(--muted)' }}>Informations légales</p>
                <div className="space-y-6">
                  {[
                    { label: 'Statut',            value: 'NGO' },
                    { label: 'Enregistrement',    value: 'MAST · N° STZ1-37440' },
                    { label: 'Date de Fondation', value: '3 avril 2020' },
                    { label: 'Adresse',           value: '#2, Impasse Guerin Bigot\nGonaïves, Haïti' },
                    { label: 'Fondatrice',        value: 'Rose Darline Chatelain' },
                  ].map(({ label, value }) => (
                    <div key={label} className="pb-5" style={{ borderBottom: '1px solid rgba(74,55,40,0.08)' }}>
                      <p className="small-caps mb-1.5" style={{ color: 'var(--muted)' }}>{label}</p>
                      <p className="font-medium leading-snug" style={{ color: 'var(--dark)', whiteSpace: 'pre-line' }}>{value}</p>
                    </div>
                  ))}
                </div>
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
              <motion.div key={lKey} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
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

      {/* ─── Vision & Mission ─── */}
      <section className="section-padding" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp()}>
              <p className="small-caps mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>{t('about.vision.label')}</p>
              <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{t('about.vision.h3')}</h2>
              <TrioStripe className="w-12 mb-10" />
            </motion.div>
            <motion.div className="space-y-8" {...fadeUp(0.1)}>
              {[
                { label: t('about.vision.vlabel'), text: t('about.vision.v'), accent: 'var(--jaune)' },
                { label: t('about.vision.mlabel'), text: t('about.vision.m'), accent: 'var(--rouge)' },
              ].map(({ label, text, accent }) => (
                <div key={label} className="p-7 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${accent}` }}>
                  <p className="small-caps mb-3" style={{ color: accent }}>{label}</p>
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{text}</p>
                </div>
              ))}
            </motion.div>
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
                  <motion.div
                    key={item.year}
                    className="flex gap-10 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10 font-display font-bold text-sm" style={{ background: c.bg, color: c.accent, border: `2px solid ${c.accent}` }}>
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
                <motion.div
                  key={titleKey}
                  className="p-8 rounded-2xl"
                  style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)', borderTop: `3px solid ${c.accent}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.65 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 font-display font-bold text-lg" style={{ background: c.bg, color: c.accent }}>★</div>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: '1.25rem', color: 'var(--dark)' }}>{t(titleKey)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t(descKey)}</p>
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
