/**
 * i18n - Internationalization for Casa do Brasil
 * Supported languages: Hebrew (he), English (en), Portuguese (pt)
 */

import { he } from './he';
import { en } from './en';
import { pt } from './pt';
import type { Language, Translations } from './types';

export type { Language, Translations } from './types';

export const translations: Record<Language, Translations> = {
  he,
  en,
  pt,
};

export const supportedLanguages: Language[] = ['he', 'en', 'pt'];

export const defaultLanguage: Language = 'he';
