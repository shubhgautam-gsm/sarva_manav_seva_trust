import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import PaymentComponent from '../components/PaymentComponent.jsx';

export default function Donate(){
  const { t } = useTranslation();
  return (
    <>
      <Section id="donate" title={t('donate.heading')}>
        <p>{t('donate.info')}</p>

        {/* Online Payment Section */}
        <div style={{ marginTop: '32px' }}>
          <PaymentComponent />
        </div>

        {/* Bank Details Section */}
        <h3 style={{marginTop:32, fontSize:'1.4rem'}}>{t('donate.bank')}</h3>
        <div className="grid">
          <div className="card">
            <p>{t('donate.account1')}</p>
          </div>
          <div className="card">
            <p>{t('donate.account2')}</p>
          </div>
        </div>
      </Section>
    </>
  );
}