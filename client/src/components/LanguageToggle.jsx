import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle(){
  const { i18n } = useTranslation();
  const swap = () => {
    const next = i18n.language === 'en' ? 'gu' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };
  const buttonText = i18n.language === 'en' ? 'ગુજરાતી' : 'English';
  return (
    <button className="control-ghost" onClick={swap}>
      {buttonText}
    </button>
  );
}