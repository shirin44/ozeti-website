import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

function TrioStripe() {
  return (
    <div className="flex h-0.75 w-full">
      <div className="flex-1" style={{ background: 'var(--rouge)' }} />
      <div className="flex-1" style={{ background: 'var(--jaune)' }} />
      <div className="flex-1" style={{ background: 'var(--vert)' }} />
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { labelKey: 'nav.home',     href: '/' },
    { labelKey: 'nav.about',    href: '/about' },
    { labelKey: 'nav.programs', href: '/programs' },
    { labelKey: 'nav.gallery',  href: '/gallery' },
    { labelKey: 'nav.contact',  href: '/contact' },
  ] as const;

  return (
    <footer style={{ background: 'var(--dark)', color: 'white' }}>
      <TrioStripe />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-14">

          {/* Brand */}
          <div>
            <img src="/Logo.png" alt="OZETI" className="h-16 w-auto mb-5" style={{ filter: 'brightness(0) invert(1)' }} />
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '18rem' }}>
              Zetwal ou briye deja tifi —<br />
              {t('footer.tagline')}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t('footer.reg')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t('footer.nav')}
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ labelKey, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm transition-colors duration-200 hover:text-jaune" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t('footer.contact')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-jaune" />
                <span className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  #2, Impasse Guerin Bigot<br />{t('footer.location')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-jaune" />
                <a href="mailto:contact@zetwaltifi.org" className="text-sm hover:text-jaune transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  contact@zetwaltifi.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-jaune" />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>+509 44 39 3608</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3.75 h-3.75 shrink-0 flex items-center justify-center text-jaune font-bold text-xs">f</span>
                <a href="https://www.facebook.com/zetwaltifi/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-jaune transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  facebook.com/zetwaltifi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} OZETI · Òganizasyon Zetwal Tifi. {t('footer.rights')}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {t('footer.nonprofit')} · {t('footer.location')}
          </p>
        </div>
      </div>
    </footer>
  );
}
