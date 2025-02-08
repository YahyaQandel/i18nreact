import React from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Import translation files
import enTranslation from '../public/locales/en/translations.json';
import esTranslation from '../public/locales/es/translations.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{t('hello')}</h1>
      <h1>{t('another_text')}</h1>
      <h1>{t('third_text')}</h1>
      <h1>{t('fourth_text')}</h1>
      <h1>{t('fifth_text')}</h1>
      <p>{t('welcome_message')}</p>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('es')}>Español</button>
    </div>
  );
};

export default App;