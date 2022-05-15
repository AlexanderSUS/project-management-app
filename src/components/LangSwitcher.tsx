import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { langButton } from '../constants/text';
import HeaderButton from './HeaderButton';

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>(
    i18n.resolvedLanguage === langButton.ru ? langButton.ru : langButton.en,
  );
  const switchLang = () => {
    if (lang === langButton.ru) {
      setLang(langButton.en);
      i18n.changeLanguage(langButton.en);
    } else {
      setLang(langButton.ru);
      i18n.changeLanguage(langButton.ru);
    }
  };

  return <HeaderButton onClick={switchLang} text={lang} />;
};

export default LangSwitcher;
