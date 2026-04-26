import { createContext, useContext, useState, type ReactNode } from 'react';
import translations, { type Lang, type TranslationKey } from './translations';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  tArr: (key: TranslationKey) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const toggleLang = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'));

  const t = (key: TranslationKey): string => {
    const val = translations[lang][key];
    return Array.isArray(val) ? val.join(', ') : (val as string);
  };

  const tArr = (key: TranslationKey): string[] => {
    const val = translations[lang][key];
    return Array.isArray(val) ? (val as string[]) : [val as string];
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
