// Site Configuration
// Casa do Brasil - Brazilian Steakhouse in Eilat
// Multi-language support: Hebrew (default), English

import type { Language } from './i18n';

export type { Language } from './i18n';
export { translations } from './i18n';

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
  defaultLang: Language;
}

export const siteConfig: SiteConfig = {
  language: "he",
  siteTitle: "קאזה דו ברזיל | מסעדת בשרים אילת",
  siteDescription: "מסעדות בשרים אילת - קאזה דו ברזיל הינה מסעדת בשרים אילת הידועה במטבח הגריל הברזילאי משובח. היכנסו לאתר לתפריט מסעדת בשרים אילת קאזה דו ברזיל.",
  defaultLang: 'he',
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { key: 'about' | 'menu' | 'reservations' | 'contact'; href: string }[];
  ctaText: string;
  ctaHref: string;
}

// Nav keys match i18n nav translations (about, menu, reservations, contact)
export const heroNavLinks: { key: 'about' | 'menu' | 'reservations' | 'contact'; href: string }[] = [
  { key: 'about', href: '#about' },
  { key: 'menu', href: '/menu' },
  { key: 'reservations', href: 'https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73' },
  { key: 'contact', href: '#contact' },
];

export const heroConfig: HeroConfig = {
  backgroundText: "CHURRASCO",
  heroImage: "/homesection.png",
  heroImageAlt: "",
  overlayText: "חוויה ברזילאית אותנטית באילת",
  brandName: "קאזה דו ברזיל",
  navLinks: heroNavLinks,
  ctaText: "הזמן שולחן עכשיו",
  ctaHref: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73",
};

// Intro Grid Section (About)
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "אודות הקאזה",
  titleLine2: "חוויה ברזילאית אותנטית",
  description: '"אח ברזיל, ברזיל... הצבעוניות, החופים, החוטינים, הכדורגל, הריו דה ז\'ינרו, הקופה-קבנה, הקפה, הקפרינייה והאוכל... אח, האוכל! בברזיל יש כלל ברזל - מאוכל נהנים כמו ב"קאזה דו ברזיל!" כשהשיפוד מתחיל לרוץ, כשאוכלים כמה שרוצים, כשריחות הבשר פולשים, כשקצב "הסמבה דו ברזיל" באוויר, מובטחת חוויה ענקית - לנפש ולגוף.',
  portfolioImages: [
    { src: "/images/1.jpg", alt: "קאזה דו ברזיל" },
    { src: "/images/Casa-24-scaled.jpg", alt: "חוויה ברזילאית במסעדה" },
    { src: "/images/Casa-35-scaled.jpg", alt: "אווירת הקאזה" },
    { src: "/images/WhatsApp Image 2026-02-17 at 22.50.53.jpeg", alt: "בשר צלוי על השיפוד עם להבות" },
    { src: "/images/WhatsApp Image 2026-02-17 at 22.50.53 (3).jpeg", alt: "קינוח שכבות עם רוטב פירות" },
    { src: "/images/bce83f45fce64e6895a191f117939419.webp", alt: "קאזה דו ברזיל - מסעדת בשרים" },
  ],
  accentText: "",
};

// Services Section (Menu Highlights)
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "מה בתפריט?",
  titleLine1: "התפריט",
  titleLine2Italic: "שלנו",
  description: 'קאזה דו ברזיל, מסעדת בשרים אילת - מציעה תפריט בשיטת "אשפטו קוהידו" - "השיפוד הרץ" - נתחי בשר עסיסיים הנפרסים על ידי ה"פסאדורים" היישר מהשיפוד אל הצלחת כמה שרק תרצו... בנוסף תוכלו ליהנות מתפריט עשיר הכולל בשרים, סלטים, מנות צמחוניות ומנות ילדים.',
  services: [
    {
      iconName: "Beef",
      title: "בשרים איכותיים",
      description: "מבחר נתחי בשר מובחרים ומיושנים: פיקנייה, אנטריקוט, אסאדו עגל, שוק טלה, נתח קצבים ופרגיות – כולם נצלים בצלייה איטית ומסורתית על גחלים לוהטות.",
    },
    {
      iconName: "Flame",
      title: "שיטת אשפטו קוהידו",
      description: "חוויית הבשרים הברזילאית המקורית: מבחר נתחים עסיסיים המוגשים ללא הגבלה. הפסאדורים שלנו עוברים בין השולחנות ופורסים את הבשר מהשיפוד ישירות לצלחת שלכם.",
    },
    {
      iconName: "Wine",
      title: "קוקטיילים ויינות משובחים",
      description: "המשקאות המפורסמים של ברזיל: מקפרינייה וקאיפירוסקה קלאסיות ועד תפריט יינות עשיר הכולל יינות בוטיק אדומים ולבנים המותאמים במיוחד לליווי הבשר.",
    },
    {
      iconName: "Salad",
      title: "ראשונות ותוספות חמות",
      description: "לצד הבשרים מוגשים למרכז השולחן סלט הבית, צ'ילי קון קרנה, אורז ברזילאי, תפוחי אדמה בעשבי תיבול, רטבי צ'ימיצ'ורי ומאפים חמים מהתנור.",
    },
  ],
};

// Why Choose Me Section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "למה לבחור בנו",
  titleRegular: "החוויה",
  titleItalic: "הברזילאית",
  statsLabel: "במספרים",
  stats: [
    { value: 2001, suffix: "", label: "משנת" },
    { value: 25, suffix: "+", label: "שנות ניסיון" },
    { value: 5000, suffix: "+", label: "ביקורות בגוגל" },
    { value: 2, suffix: "M+", label: "לקוחות" },
  ],
  featureCards: [
    { image: "/meat-1.jpg", imageAlt: "בשר על השיפוד", title: "שיטת השיפוד הרץ", description: "נתחי בשר עסיסיים הנפרסים על ידי הפסאדורים היישר מהשיפוד אל הצלחת." },
    { image: "/salad-bar.jpg", imageAlt: "בר סלטים", title: "בר סלטים עשיר", description: "מגוון סלטים טריים, ירקות ומאפים חמים מהתנור." },
  ],
  wideImage: "/grill.jpg",
  wideImageAlt: "הגריל הברזילאי",
  wideTitle: "חוויה ברזילאית אותנטית",
  wideDescription: "כשהשיפוד מתחיל לרוץ, כשאוכלים כמה שרוצים - מובטחת חוויה ענקית.",
};

// FAQ - content comes from translations, CTA href is shared
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqCtaHref = "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

// Footer - nav keys match i18n (about, menu, reservations)
export const footerNavLinks: { key: 'about' | 'menu' | 'reservations'; href: string }[] = [
  { key: 'about', href: '#about' },
  { key: 'menu', href: '/menu' },
  { key: 'reservations', href: 'https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73' },
];

export interface FooterConfig {
  logoText: string;
  email: string;
  socialLinks: { iconName: string; label: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  logoText: "CASA DO BRASIL",
  email: "info@casadobrasil.co.il",
  socialLinks: [
    { iconName: "Instagram", label: "Instagram", href: "https://instagram.com/casadobrasil" },
    { iconName: "Facebook", label: "Facebook", href: "https://facebook.com/casadobrasil" },
    { iconName: "TikTok", label: "TikTok", href: "https://www.tiktok.com/@casadobrasileilat?_r=1&_t=ZS-940PLEy8maT" },
  ],
};
