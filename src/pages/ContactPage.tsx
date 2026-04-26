import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease, delay },
});

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  border: '1px solid rgba(74,55,40,0.18)',
  borderRadius: '0.75rem',
  background: 'white',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  color: 'var(--dark)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

function InputField({
  id, label, type = 'text', value, onChange, required = true, placeholder,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>
        {label} {required && <span style={{ color: 'var(--rouge)' }}>*</span>}
      </label>
      <input
        id={id} name={id} type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required} placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: focused ? 'var(--rouge)' : 'rgba(74,55,40,0.18)',
          boxShadow: focused ? '0 0 0 3px rgba(200,35,26,0.08)' : 'none',
        }}
      />
    </div>
  );
}

function TrioStripe() {
  return (
    <div className="flex h-0.75 w-full">
      <div className="flex-1" style={{ background: 'var(--rouge)' }} />
      <div className="flex-1" style={{ background: 'var(--jaune)' }} />
      <div className="flex-1" style={{ background: 'var(--vert)' }} />
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm]           = useState({ nom: '', email: '', sujet: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [textFocused, setTextFocused]   = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ nom: '', email: '', sujet: 'general', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  const faqs = [
    { q: t('contact.faq.1.q'), a: t('contact.faq.1.a') },
    { q: t('contact.faq.2.q'), a: t('contact.faq.2.a') },
    { q: t('contact.faq.3.q'), a: t('contact.faq.3.a') },
  ];

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─── Header ─── */}
      <section className="relative overflow-hidden pt-10 pb-24" style={{ background: 'var(--dark)' }}>
        <TrioStripe />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>{t('contact.breadcrumb')}</p>
            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{t('contact.h1')}</h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{t('contact.sub')}</p>
          </motion.div>
        </div>
        <div className="absolute right-10 bottom-0 font-display font-bold select-none pointer-events-none" style={{ fontSize: '18rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }} aria-hidden>★</div>
      </section>

      {/* ─── Contact section ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Info column */}
            <motion.div className="lg:col-span-4" {...fadeUp()}>
              <p className="small-caps mb-6" style={{ color: 'var(--muted)' }}>{t('contact.info.h')}</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--rouge-light)' }}>
                    <MapPin size={18} style={{ color: 'var(--rouge)' }} />
                  </div>
                  <div>
                    <p className="small-caps mb-1">Adresse</p>
                    <p className="text-sm leading-snug" style={{ color: 'var(--mid)' }}>
                      #2, Impasse Guerin Bigot<br />{t('contact.info.location')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--jaune-light)' }}>
                    <Mail size={18} style={{ color: 'var(--jaune)' }} />
                  </div>
                  <div>
                    <p className="small-caps mb-1">Email</p>
                    <a href="mailto:contact@zetwaltifi.org" className="text-sm transition-colors duration-200 hover:text-rouge" style={{ color: 'var(--mid)' }}>
                      contact@zetwaltifi.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--vert-light)' }}>
                    <Phone size={18} style={{ color: 'var(--vert)' }} />
                  </div>
                  <div>
                    <p className="small-caps mb-1.5">Téléphone</p>
                    <a href="tel:+33605617198" className="text-sm block transition-colors duration-200 hover:text-rouge" style={{ color: 'var(--mid)' }}>+33 6 05 61 71 98</a>
                    <a href="tel:+50944393608" className="text-sm block transition-colors duration-200 hover:text-rouge mt-0.5" style={{ color: 'var(--muted)' }}>+509 44 39 3608</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 8px rgba(26,17,9,0.06)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--rouge-light)' }}>
                    <ExternalLink size={18} style={{ color: 'var(--rouge)' }} />
                  </div>
                  <div>
                    <p className="small-caps mb-1">Facebook</p>
                    <a href="https://www.facebook.com/zetwaltifi/" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200 hover:text-rouge" style={{ color: 'var(--mid)' }}>
                      facebook.com/zetwaltifi
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{ background: 'var(--dark)' }}>
                <p className="small-caps mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {t('contact.info.reg')}
                </p>
                <div className="space-y-4">
                  {[
                    { l: 'MAST', v: 'STZ1-37440' },
                    { l: 'Fondatrice', v: 'Rose Darline Chatelain' },
                    { l: '2020', v: '3 avril 2020' },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</p>
                      <p className="text-sm font-medium text-white">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form column */}
            <motion.div className="lg:col-span-8" {...fadeUp(0.12)}>
              <div className="rounded-2xl p-8 md:p-12" style={{ background: 'white', boxShadow: '0 2px 24px rgba(26,17,9,0.07)' }}>
                <h2 className="mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>{t('contact.h1')}</h2>
                <div className="w-10 mb-8"><TrioStripe /></div>

                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: 'var(--vert-light)' }}>
                      <CheckCircle size={32} style={{ color: 'var(--vert)' }} />
                    </div>
                    <p className="font-display font-bold text-dark text-xl">{t('contact.form.success.h')}</p>
                    <p className="text-sm" style={{ color: 'var(--muted)', maxWidth: '20rem' }}>{t('contact.form.success.p')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InputField id="nom" label={t('contact.form.name')} value={form.nom} onChange={handleChange} placeholder="Rose Darline" />
                      <InputField id="email" label={t('contact.form.email')} type="email" value={form.email} onChange={handleChange} placeholder="rose@example.com" />
                    </div>

                    <div>
                      <label htmlFor="sujet" className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>
                        {t('contact.form.subject')} <span style={{ color: 'var(--rouge)' }}>*</span>
                      </label>
                      <select
                        id="sujet" name="sujet" value={form.sujet} onChange={handleChange}
                        onFocus={() => setSelectFocused(true)} onBlur={() => setSelectFocused(false)}
                        style={{ ...inputStyle, borderColor: selectFocused ? 'var(--rouge)' : 'rgba(74,55,40,0.18)', boxShadow: selectFocused ? '0 0 0 3px rgba(200,35,26,0.08)' : 'none', cursor: 'pointer' }}
                      >
                        <option value="general">Question générale / General question</option>
                        <option value="participation">Programmes / Programs</option>
                        <option value="donation">Donation</option>
                        <option value="partnership">Partenariat / Partnership</option>
                        <option value="volunteer">Bénévolat / Volunteer</option>
                        <option value="other">Autre / Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>
                        {t('contact.form.message')} <span style={{ color: 'var(--rouge)' }}>*</span>
                      </label>
                      <textarea
                        id="message" name="message" value={form.message} onChange={handleChange}
                        onFocus={() => setTextFocused(true)} onBlur={() => setTextFocused(false)}
                        required rows={6}
                        style={{ ...inputStyle, resize: 'none', borderColor: textFocused ? 'var(--rouge)' : 'rgba(74,55,40,0.18)', boxShadow: textFocused ? '0 0 0 3px rgba(200,35,26,0.08)' : 'none' }}
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      {t('contact.form.send')} <Send size={15} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Map placeholder ─── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            className="w-full rounded-2xl overflow-hidden flex items-center justify-center relative"
            style={{ height: '320px', background: 'var(--jaune-light)', border: '1px solid rgba(245,197,24,0.3)' }}
            {...fadeUp()}
          >
            <div className="text-center">
              <MapPin size={40} className="mx-auto mb-3" style={{ color: 'var(--muted)' }} />
              <p className="font-display italic text-lg" style={{ color: 'var(--mid)' }}>{t('contact.info.location')}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>#2, Impasse Guerin Bigot</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding" style={{ background: 'white', borderTop: '1px solid rgba(74,55,40,0.06)' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="small-caps mb-4" style={{ color: 'var(--muted)' }}>{t('contact.faq.h')}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>FAQ</h2>
          </motion.div>
          <div style={{ borderTop: '1px solid rgba(74,55,40,0.08)' }}>
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                className="py-7"
                style={{ borderBottom: '1px solid rgba(74,55,40,0.08)' }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <p className="font-display font-bold mb-3" style={{ fontSize: '1.05rem', color: 'var(--dark)' }}>{q}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
