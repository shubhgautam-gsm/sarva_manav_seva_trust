import React from 'react';
import news1 from "../imgs/news1.jpg";
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';

export default function Media(){
  const { t } = useTranslation();
  return (
    <Section id="gallery" title="Media Gallery">

      <div className="card">
              <img src={news1} alt="news" />

      </div>
    </Section>
  );
}