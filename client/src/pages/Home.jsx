import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';
// import charity from '../imgs/help1.png'
import charity from '../imgs/help3.jpg'

export default function Home(){
  const { t } = useTranslation();

  useEffect(() => {
    // Restart CSS animations on mount so the body background + overlay + bubbles start visibly.
    // This forces a reflow and restarts the animation without altering your stylesheet.
    const body = document.body;
    if (!body) return;

    // Temporarily disable animation and force reflow to restart it
    const prev = body.style.animation;
    body.style.animation = 'none';
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    body.offsetWidth;
    // restore (empty string returns to CSS-defined animation)
    body.style.animation = prev || '';

    // No persistent side-effects needed on unmount; leave animation running.
  }, []);

  return (
    <>
      {/* Decorative layers placed at app level so CSS (fixed positioning) shows them behind content */}
      <div className="bubbles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="bubble" />
        ))}
      </div>

      {/* overlay that crossfades on body background changes (we animate body::after in CSS) */}
      <div className="slideshow-overlay" aria-hidden="true" />

      {/* keep page content above background/bubbles */}
      <Section id="hero" className="content-above-bg">
        <div className="hero">
          <img width="30%" height="500px" src={charity} alt="" />
          <div className="left">
            <h1>{t('hero.title')}</h1>
            <p className="lead">{t('hero.subtitle')}</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/donate" className="control-btn">{t('hero.cta_donate')}</Link>
              <Link to="/join" className="control-btn">{t('hero.cta_volunteer')}</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
