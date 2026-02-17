// i18n Types - Casa do Brasil
// Supported languages: Hebrew (default), English

export type Language = 'he' | 'en' | 'pt';

export interface NavTranslations {
  about: string;
  menu: string;
  reservations: string;
  benefits: string;
  gallery: string;
  contact: string;
}

export interface HeroTranslations {
  subtitle: string;
  cta: string;
  imageAlt: string;
}

export interface AboutTranslations {
  title1: string;
  title2: string;
  quote: string;
  description: string;
  portfolioAlts: string[];
}

export interface MenuTranslations {
  title: string;
  description: string;
  cta: string;
  viewFullMenu: string;
  titleLine1: string;
  titleLine2Italic: string;
  services: { iconName: string; title: string; description: string }[];
}

export interface BenefitsTranslations {
  title: string;
  description: string;
  cta: string;
}

export interface StatsTranslations {
  fromYear: string;
  years: string;
  reviews: string;
  customers: string;
}

export interface ContactTranslations {
  title: string;
  address: string;
  hours: string;
}

export interface FooterTranslations {
  tagline: string;
  copyright: string;
  navigationLabel: string;
  socialLabel: string;
  accessibilityStatement: string;
}

export interface FullMenuTranslations {
  close: string;
  bookTable: string;
  sectionTitle: string;
  meatNote: string;
  back: string;
  perDiner: string;
  or: string;
  categoriesLabel: string;
  pricePerItem: string;
  pricePerWeight: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface TestimonialsTranslations {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQTranslations {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  faqs: FAQItem[];
}

export interface Translations {
  siteTitle: string;
  siteDescription: string;
  nav: NavTranslations;
  bookTable: string;
  phone: string;
  hero: HeroTranslations;
  about: AboutTranslations;
  menu: MenuTranslations;
  benefits: BenefitsTranslations;
  stats: StatsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
  fullMenu: FullMenuTranslations;
  testimonials: TestimonialsTranslations;
  faq: FAQTranslations;
}
