import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease, delay },
});

const COLORS = {
  rouge: { accent: 'var(--rouge)', bg: 'var(--rouge-light)', border: '3px solid var(--rouge)' },
  jaune: { accent: 'var(--jaune)', bg: 'var(--jaune-light)', border: '3px solid var(--jaune)' },
  vert:  { accent: 'var(--vert)',  bg: 'var(--vert-light)',  border: '3px solid var(--vert)'  },
} as const;
type ColorKey = keyof typeof COLORS;

function TrioStripe() {
  return (
    <div className="flex h-[3px]">
      <div className="flex-1" style={{ background: 'var(--rouge)' }} />
      <div className="flex-1" style={{ background: 'var(--jaune)' }} />
      <div className="flex-1" style={{ background: 'var(--vert)' }} />
    </div>
  );
}

export default function ProgramsPage() {
  const { t, tArr } = useLanguage();

  const programs: { id: number; num: string; color: ColorKey; titleKey: string; tagKey: string; descKey: string; itemsKey: string; impactValue: string; impactLabelKey: string }[] = [
    { id: 1, num: '01', color: 'rouge', titleKey: 'programs.edu.title', tagKey: 'programs.edu.tag', descKey: 'programs.edu.desc', itemsKey: 'programs.edu.items', impactValue: '200+', impactLabelKey: 'programs.stat1.l' },
    { id: 2, num: '02', color: 'jaune', titleKey: 'programs.psy.title', tagKey: 'programs.psy.tag', descKey: 'programs.psy.desc', itemsKey: 'programs.psy.items', impactValue: '200+', impactLabelKey: 'programs.stat1.l' },
    { id: 3, num: '03', color: 'vert',  titleKey: 'programs.eco.title', tagKey: 'programs.eco.tag', descKey: 'programs.eco.desc', itemsKey: 'programs.eco.items', impactValue: '200+', impactLabelKey: 'programs.stat1.l' },
  ];

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─── Header ─── */}
      <section className="relative overflow-hidden pt-10 pb-24" style={{ background: 'var(--dark)' }}>
        <TrioStripe />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>{t('programs.breadcrumb')}</p>
            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{t('programs.h1')}</h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{t('programs.sub')}</p>
          </motion.div>
        </div>
        <div
          className="absolute right-10 bottom-0 font-display font-bold select-none pointer-events-none"
          style={{ fontSize: '18rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
          aria-hidden
        >3</div>
      </section>

      {/* ─── Sticky nav ─── */}
      <section className="bg-white border-b border-cream sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex gap-8 overflow-x-auto">
            {programs.map((p) => {
              const c = COLORS[p.color];
              return (
                <a
                  key={p.id}
                  href={`#program-${p.id}`}
                  className="small-caps py-4 whitespace-nowrap border-b-2 border-transparent hover:border-current transition-all duration-200 flex-shrink-0"
                  style={{ color: c.accent }}
                >
                  {p.num} · {t(p.titleKey as Parameters<typeof t>[0])}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Program cards ─── */}
      {programs.map((program, index) => {
        const c = COLORS[program.color];
        const isEven = index % 2 === 0;
        const items = tArr(program.itemsKey as Parameters<typeof t>[0]);

        return (
          <section
            key={program.id}
            id={`program-${program.id}`}
            className="section-padding"
            style={{ background: isEven ? 'var(--cream)' : 'white' }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start`}>

                {/* Visual */}
                <motion.div {...fadeUp(0)} className={isEven ? '' : 'lg:order-2'}>
                  <div
                    className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{ height: '340px', background: c.bg, borderTop: c.border }}
                  >
                    <span className="font-display font-bold select-none" style={{ fontSize: '14rem', lineHeight: 1, color: 'rgba(26,17,9,0.06)' }}>
                      {program.num}
                    </span>
                    <div
                      className="absolute bottom-8 left-8 right-8 rounded-xl p-5"
                      style={{ background: 'white', boxShadow: '0 4px 20px rgba(26,17,9,0.08)' }}
                    >
                      <p className="small-caps mb-1">Impact</p>
                      <p className="font-display font-bold" style={{ fontSize: '2.5rem', color: c.accent, lineHeight: 1 }}>
                        {program.impactValue}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                        {t(program.impactLabelKey as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div {...fadeUp(0.12)} className={isEven ? '' : 'lg:order-1'}>
                  <p className="small-caps mb-4" style={{ color: c.accent }}>
                    {t(program.tagKey as Parameters<typeof t>[0])}
                  </p>
                  <h2 className="leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
                    {t(program.titleKey as Parameters<typeof t>[0])}
                  </h2>
                  <div className="w-10 h-0.5 mb-7" style={{ background: c.accent }} />
                  <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--mid)', fontWeight: 300 }}>
                    {t(program.descKey as Parameters<typeof t>[0])}
                  </p>
                  <ul className="space-y-3">
                    {items.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={17} className="shrink-0 mt-0.5" style={{ color: c.accent }} />
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--mid)' }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── Impact stats ─── */}
      <section className="section-padding" style={{ background: 'var(--jaune-light)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="small-caps mb-3" style={{ color: 'var(--muted)' }}>{t('programs.impact.label')}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{t('programs.impact.h2')}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { nKey: 'programs.stat1.n', lKey: 'programs.stat1.l', color: 'var(--rouge)' },
              { nKey: 'programs.stat2.n', lKey: 'programs.stat2.l', color: 'var(--jaune)' },
              { nKey: 'programs.stat3.n', lKey: 'programs.stat3.l', color: 'var(--vert)'  },
              { nKey: 'programs.stat4.n', lKey: 'programs.stat4.l', color: 'var(--rouge)' },
            ].map(({ nKey, lKey, color }, i) => (
              <motion.div key={lKey} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <p className="font-display font-bold mb-2" style={{ fontSize: '3rem', lineHeight: 1, color }}>
                  {t(nKey as Parameters<typeof t>[0])}
                </p>
                <p className="text-sm" style={{ color: 'var(--mid)' }}>
                  {t(lKey as Parameters<typeof t>[0])}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding" style={{ background: 'var(--dark)' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.div {...fadeUp()}>
            <p className="small-caps mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>{t('programs.join.label')}</p>
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
              {t('programs.join.h2')}
            </h2>
            <p className="text-lg mb-12 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
              {t('programs.join.sub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-secondary">{t('programs.join.btn')}</button>
              </Link>
              <a href="mailto:contact@zetwaltifi.org">
                <button className="btn-outline">contact@zetwaltifi.org <ArrowRight size={15} /></button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
