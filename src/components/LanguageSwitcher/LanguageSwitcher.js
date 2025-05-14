import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
    >
      {language === 'en' ? 'DE' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
