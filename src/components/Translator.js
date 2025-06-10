// src/components/Translator.js
import { useEffect } from 'react';
import useGeoLanguage from '../hooks/useGeoLanguage';

const Translator = () => {
  const language = useGeoLanguage();

  useEffect(() => {
    const addTranslateScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: language, // auto-detected lang like 'ta', 'kn'
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    addTranslateScript();
  }, [language]);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default Translator;
