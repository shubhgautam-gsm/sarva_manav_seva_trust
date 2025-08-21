import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';

export default function Services(){
  const { t } = useTranslation();
  return (
    <Section id="services" title={t('services.heading')}>
      <div className="card">
        <h3 style={{marginTop:0}}>{t('services.subheading_meals')}</h3>
        <p>{t('services.body_meals')}</p>
      </div>
    </Section>
  );
}