import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';

export default function About() {
  const { t } = useTranslation();
  return (
    <Section id="about" title={t('about.heading')}>
      <p>{t('about.body')}</p>
     
    </Section>
  );
}