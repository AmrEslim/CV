import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <p>© {currentYear} Amr Eslim | {t('hero.subtitle')}</p>
        <p>{t('contact.info.locationValue')}</p>
      </div>
    </footer>
  );
};

export default Footer;