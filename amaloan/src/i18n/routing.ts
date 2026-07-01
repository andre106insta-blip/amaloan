import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'pt-BR', 'fr', 'de', 'ja', 'ko', 'zh-Hans', 'ar', 'ru', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  'pt-BR': 'Português',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  'zh-Hans': '简体中文',
  ar: 'العربية',
  ru: 'Русский',
  tr: 'Türkçe',
};

export const rtlLocales = ['ar'];
