import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease, delay },
});

function TrioStripe({ h = '3px', className = '' }: { h?: string; className?: string }) {
  return (
    <div className={`flex w-full ${className}`} style={{ height: h }}>
      <div className="flex-1" style={{ background: 'var(--rouge)' }} />
      <div className="flex-1" style={{ background: 'var(--jaune)' }} />
      <div className="flex-1" style={{ background: 'var(--vert)' }} />
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const heroRef  = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawImgY = useTransform(heroScroll, [0, 1], [0, 60]);
  const imgY    = useSpring(rawImgY, { stiffness: 60, damping: 20 });

  const { scrollYProgress: quoteScroll } = useScroll({ target: quoteRef, offset: ['start end', 'center center'] });
  const quoteX = useTransform(quoteScroll, [0, 1], ['8%', '0%']);

  const missionItems = [
    { num: '01', accent: 'var(--rouge)', img: '/Hero.jpg', titleKey: 'mission.01.title', descKey: 'mission.01.desc', detailKey: 'mission.01.detail' },
    { num: '02', accent: 'var(--jaune)', img: '/b.jpg', titleKey: 'mission.02.title', descKey: 'mission.02.desc', detailKey: 'mission.02.detail' },
    { num: '03', accent: 'var(--vert)',  img: '/c.jpg', titleKey: 'mission.03.title', descKey: 'mission.03.desc', detailKey: 'mission.03.detail' },
  ] as const;

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ════ HERO ════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: '100svh', paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-0.75 hidden lg:block"
          style={{ background: 'linear-gradient(to bottom, var(--rouge) 33%, var(--jaune) 66%, var(--vert))', opacity: 0.6 }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease }}>
              <motion.p
                className="small-caps mb-7 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span style={{ width: '1.5rem', height: '1.5px', background: 'var(--rouge)', display: 'inline-block' }} />
                {t('hero.tagline')}
              </motion.p>

              <motion.h1
                className="leading-none tracking-tight mb-4"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 }}
              >
                {t('hero.h1a')}{' '}
                <em className="italic" style={{ color: 'var(--rouge)' }}>{t('hero.h1b')}</em>
                <br />
                {t('hero.h1c')}{' '}
                <em className="italic" style={{ color: 'var(--vert)' }}>{t('hero.h1d')}</em>
              </motion.h1>

              <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease, delay: 0.5 }}>
                <TrioStripe className="w-20 mb-7" />
              </motion.div>

              <motion.p
                className="mb-10 leading-relaxed"
                style={{ fontSize: '1.125rem', color: 'var(--mid)', fontWeight: 300, maxWidth: '32rem' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <em className="font-display italic" style={{ color: 'var(--dark)', fontSize: '1.1em' }}>
                  {t('hero.subKreol')}
                </em>{' '}
                {t('hero.sub')}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
              >
                <Link to="/about"><button className="btn-primary">{t('hero.cta1')} <ArrowRight size={15} /></button></Link>
                <Link to="/programs"><button className="btn-outline-dark">{t('hero.cta2')}</button></Link>
              </motion.div>

            </motion.div>

            {/* Right — hero photo */}
            <motion.div
              className="relative hidden lg:block"
              style={{ y: imgY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
            >
              {/* Offset accent frames */}
              <div className="absolute -inset-3 rounded-3xl" style={{ background: 'var(--jaune-light)', transform: 'rotate(2deg)', zIndex: 0 }} />
              <div className="absolute -inset-3 rounded-3xl" style={{ background: 'var(--rouge-light)', transform: 'rotate(-1.5deg)', zIndex: 0 }} />

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden" style={{ zIndex: 1, boxShadow: '0 32px 80px rgba(26,17,9,0.18)' }}>
                <img
                  src="/newhero.jpg"
                  alt="OZETI — jeunes filles"
                  style={{ width: '100%', height: 'clamp(480px, 55vh, 680px)', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, rgba(250,248,244,0.6), transparent)' }} />
              </div>

              {/* Trio stripe accent */}
              <div className="absolute -bottom-1 left-4 right-4 rounded-b-2xl overflow-hidden" style={{ height: '4px', zIndex: 2 }}>
                <TrioStripe />
              </div>

              {/* Floating star badge */}
              <motion.div
                className="absolute -top-4 -right-4 z-10 flex items-center justify-center rounded-full font-display font-bold text-lg"
                style={{ width: '56px', height: '56px', background: 'var(--jaune)', color: 'var(--dark)', boxShadow: '0 8px 24px rgba(245,197,24,0.4)' }}
                animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ★
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span className="small-caps" style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{t('hero.scroll')}</span>
          <motion.div
            style={{ width: '1px', height: '36px', background: 'var(--muted)', opacity: 0.35 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          />
        </motion.div>
      </section>

      {/* ════ MISSION ════ */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div className="mb-20" {...fadeUp()}>
            <p className="small-caps mb-3" style={{ color: 'var(--rouge)' }}>{t('mission.label')}</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '24rem' }}>{t('mission.h2')}</h2>
          </motion.div>

          <div style={{ borderTop: '1px solid rgba(74,55,40,0.1)' }}>
            {missionItems.map(({ num, accent, img, titleKey, descKey, detailKey }, i) => (
              <motion.div
                key={num}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-12 lg:py-16 items-center"
                style={{ borderBottom: '1px solid rgba(74,55,40,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease, delay: i * 0.08 }}
              >
                {/* Number */}
                <div className="lg:col-span-1 hidden lg:block">
                  <span
                    className="font-display font-bold select-none block"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1, color: 'rgba(74,55,40,0.1)', transition: 'color 0.35s ease' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accent)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(74,55,40,0.1)')}
                  >
                    {num}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-7">
                  <div className="w-5 h-0.5 mb-5 transition-all duration-300 group-hover:w-14" style={{ background: accent }} />
                  <p className="small-caps mb-3 lg:hidden" style={{ color: accent }}>{num}</p>
                  <h3 className="font-display font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)', whiteSpace: 'pre-line', color: 'var(--dark)' }}>
                    {t(titleKey)}
                  </h3>
                  <p className="text-base leading-relaxed mb-3" style={{ color: 'var(--mid)', fontWeight: 300 }}>{t(descKey)}</p>
                  <p className="text-sm italic font-display mb-5" style={{ color: accent }}>{t(detailKey)}</p>
                  <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-3" style={{ color: accent }}>
                    {t('mission.more')} <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Photo */}
                <div className="lg:col-span-4">
                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{ boxShadow: '0 8px 32px rgba(26,17,9,0.1)', borderTop: `3px solid ${accent}` }}
                  >
                    <img
                      src={img}
                      alt={t(titleKey)}
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                      style={{ height: '240px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PULL QUOTE ════ */}
      <section
        ref={quoteRef}
        className="relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          minHeight: '80svh',
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: 'clamp(4rem, 10vw, 8rem) 0',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(26,17,9,0.72)' }} />
        <TrioStripe className="absolute top-0 left-0 right-0" />

        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none" aria-hidden>
          <span className="font-display" style={{ fontSize: 'clamp(24rem, 60vw, 80rem)', color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none' }}>★</span>
        </div>

        <div className="relative z-10 text-center px-4" style={{ maxWidth: 'min(92vw, 1000px)' }}>
          <motion.p className="small-caps mb-10" style={{ color: 'rgba(255,255,255,0.4)' }} {...fadeUp()}>
            {t('quote.label')}
          </motion.p>
          <motion.p
            className="font-display italic text-white leading-tight"
            style={{ fontSize: 'clamp(2.8rem, 8.5vw, 8rem)', x: quoteX }}
            initial={{ opacity: 0, x: '6%' }}
            whileInView={{ opacity: 1, x: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            "Zetwal ou briye
            <br />
            <span style={{ color: 'var(--jaune)' }}>deja tifi"</span>
          </motion.p>
          <motion.p
            className="mt-10"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 300 }}
            {...fadeUp(0.2)}
          >
            {t('quote.subtitle')}
          </motion.p>
        </div>
        <TrioStripe className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* ════ FOUNDER ════ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            <motion.div
              className="flex items-start justify-center order-2 lg:order-1"
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ width: '100%', maxWidth: '380px', boxShadow: '0 20px 60px rgba(26,17,9,0.15)' }}>
                <img
                  src="/founder.jpg"
                  alt="Rose Darline Chatelain — Fondatrice OZETI"
                  style={{ width: '100%', height: '460px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <p className="small-caps mb-3" style={{ color: 'var(--rouge)' }}>{t('founder.label')}</p>
              <h2 className="mb-2 leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>{t('founder.h2')}</h2>
              <TrioStripe className="w-12 mt-4 mb-8" />
              <p
                className="font-display italic mb-7"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--dark)', lineHeight: 1.5, borderLeft: '3px solid var(--rouge)', paddingLeft: '1.25rem' }}
              >
                {t('quote.text')}
              </p>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--mid)', fontWeight: 300, fontSize: '0.9375rem' }}>{t('founder.p1')}</p>
              <p className="leading-relaxed mb-10" style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{t('founder.p2')}</p>
              <Link to="/about">
                <button className="btn-outline-dark">{t('founder.cta')} <ArrowRight size={15} /></button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="relative overflow-hidden" style={{ background: 'var(--rouge)', padding: 'clamp(5rem, 12vw, 9rem) 0' }}>
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display italic" style={{ fontSize: 'clamp(8rem, 22vw, 20rem)', color: 'rgba(255,255,255,0.06)', lineHeight: 1, whiteSpace: 'nowrap' }}>
            {t('cta.water')}
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <motion.div className="max-w-2xl" {...fadeUp()}>
            <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('cta.label')}</p>
            <h2 className="text-white leading-tight mb-8" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}>{t('cta.h2')}</h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '28rem' }}>{t('cta.sub')}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <button className="btn-secondary" style={{ background: 'var(--jaune)', color: 'var(--dark)' }}>{t('cta.btn1')}</button>
              </Link>
              <Link to="/programs">
                <button className="btn-outline">{t('cta.btn2')}</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
