import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';

export default function Join(){
  const { t } = useTranslation();
  return (
    <Section id="join" title="Join Us as a Volunteer">
      <div className="card">
        <p>Volunteer registration form will be available soon</p>
      </div>
    </Section>
  );
}