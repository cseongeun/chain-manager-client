import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resourceEn from '@/lang/en';
import resourceKo from '@/lang/ko';

const resources = {
  en: {
    translation: resourceEn,
  },
  ko: {
    translation: resourceKo,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    // 초기 설정 언어
    lng: 'en',
    fallbackLng: {
      en: ['en'],
      ko: ['ko'],
      default: ['en'],
    },
    defaultNS: 'translation',
    ns: 'translation',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
