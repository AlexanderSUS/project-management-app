import React, { useState } from 'react';
import { langButton } from '../constants/text';
import HeaderButton from './HeaderButton';

const LangSwitcher = () => {
  const [lang, setLang] = useState<string>(langButton.ru);
  const switchLang = () => {
    if (lang === langButton.ru) {
      setLang(langButton.en);
    } else {
      setLang(langButton.ru);
    }
  };

  return (
    <HeaderButton onClick={switchLang} text={lang} />
  );
};

export default LangSwitcher;
