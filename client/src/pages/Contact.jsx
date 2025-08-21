import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';

export default function Contact(){
  const { t } = useTranslation();
  return (
    <Section id="contact" title={t('contact.heading')}>
      <div className="grid grid-3">
        <div className="card">
          <h3 style={{marginTop:0}}>{t('contact.office')}</h3>
          <p>{t('contact.address')}</p>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>{t('contact.phone')}</h3>
          <p>
            <a  href="tel:02812231967">0281-2231967</a><br />
            <a href="tel:9374101113">+91 93741 01113</a>
          </p>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>{t('contact.email')}</h3>
          <p>
            <a href="mailto:jaysiyaramhospital@gmail.com">jaysiyaramhospital@gmail.com</a>
          </p>
        </div>
      </div>
    </Section>
  );
}