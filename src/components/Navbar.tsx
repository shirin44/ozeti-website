import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'),     href: '/' },
    { label: t('nav.about'),    href: '/about' },
    { label: t('nav.programs'), href: '/programs' },
    { label: t('nav.gallery'),  href: '/gallery' },
    { label: t('nav.contact'),  href: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(245,197,24,0.5)]'
            : 'bg-white/80 backdrop-blur-sm border-b border-jaune/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/Logo.png"
                alt="OZETI"
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'}`}
              />
              <span
                className="font-display font-bold text-dark hidden sm:inline tracking-tight transition-all duration-300"
                style={{ fontSize: scrolled ? '1.2rem' : '1.375rem' }}
              >
                OZETI
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group"
                    style={{ color: active ? 'var(--dark)' : 'var(--mid)' }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{
                        background: 'var(--jaune)',
                        transform: active ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    {!active && (
                      <span
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full group-hover:scale-x-100"
                        style={{
                          background: 'rgba(245,197,24,0.5)',
                          transform: 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side: lang toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="relative flex items-center gap-0.5 text-xs font-medium tracking-widest uppercase rounded-full px-3 py-1.5 border transition-all duration-200 hover:border-rouge"
                style={{
                  color: 'var(--mid)',
                  borderColor: 'rgba(74,55,40,0.2)',
                  fontFamily: 'var(--font-sans)',
                }}
                aria-label="Toggle language"
              >
                <span style={{ color: lang === 'fr' ? 'var(--rouge)' : 'var(--muted)', transition: 'color 0.2s' }}>FR</span>
                <span style={{ color: 'var(--muted)', margin: '0 2px' }}>/</span>
                <span style={{ color: lang === 'en' ? 'var(--rouge)' : 'var(--muted)', transition: 'color 0.2s' }}>EN</span>
              </button>

              <a href="https://www.paypal.me/RoseDarlineChatelain" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>
                  {t('nav.support')}
                </button>
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-dark hover:bg-cream transition-colors"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-cream shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-jaune/30">
                <img src="/Logo.png" alt="OZETI" className="h-9 w-auto" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-dark hover:bg-white/60 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Link
                        to={link.href}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{
                          color: active ? 'var(--rouge)' : 'var(--mid)',
                          background: active ? 'var(--rouge-light)' : 'transparent',
                        }}
                      >
                        {active && (
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: 'var(--rouge)' }}
                          />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-6 py-8 border-t border-jaune/30">
                {/* Mobile language toggle */}
                <div className="flex justify-center mb-5">
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 text-sm font-medium rounded-full px-5 py-2 border transition-all duration-200"
                    style={{ borderColor: 'rgba(74,55,40,0.2)', color: 'var(--mid)' }}
                  >
                    <span style={{ color: lang === 'fr' ? 'var(--rouge)' : 'var(--muted)' }}>Français</span>
                    <span style={{ color: 'var(--muted)' }}>/</span>
                    <span style={{ color: lang === 'en' ? 'var(--rouge)' : 'var(--muted)' }}>English</span>
                  </button>
                </div>
                <a href="https://www.paypal.me/RoseDarlineChatelain" target="_blank" rel="noopener noreferrer" className="block">
                  <button className="btn-primary w-full justify-center">
                    {t('nav.support')}
                  </button>
                </a>
                <p className="text-xs text-center text-muted mt-4 leading-snug">
                  {t('nav.reg')}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  );
}
