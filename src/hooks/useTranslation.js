import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json';
import de from '../translations/de.json';

const translations = { en, de };

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t };
};
