import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="editorial-hero">
      <div className="editorial-hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t('hero.editorial.eyebrow')}</p>
          <h1>Amr Eslim</h1>
          <p className="hero-lede">{t('hero.editorial.lede')}</p>
          <p className="hero-note">{t('hero.editorial.note')}</p>
          <div className="hero-actions">
            <HashLink smooth to="/#posts" className="hero-action hero-action-primary">
              {t('hero.editorial.read')} <span aria-hidden="true">↓</span>
            </HashLink>
            <HashLink smooth to="/#projects" className="hero-action">
              {t('hero.editorial.work')} <span aria-hidden="true">↗</span>
            </HashLink>
          </div>
        </div>
        <figure className="hero-portrait">
          <img
            src={`${import.meta.env.BASE_URL}images/profile.webp`}
            alt="Amr Eslim in Berlin"
            fetchPriority="high"
          />
          <figcaption>Amr Eslim <span>· {t('hero.editorial.location')}</span></figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Hero;