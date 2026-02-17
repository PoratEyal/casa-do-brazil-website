import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig, translations, type Language } from '../config';
import { Phone, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

export function Hero({ currentLang, setCurrentLang }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  if (!heroConfig.backgroundText && !heroConfig.heroImage && heroConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 30);
    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      const modelTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (modelRef.current) {
            gsap.set(modelRef.current, { yPercent: self.progress * 20 });
          }
        },
      });
      triggers.push(modelTrigger);

      const overlayTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '30% top',
        scrub: 1,
        onUpdate: (self) => {
          if (overlayTextRef.current) {
            gsap.set(overlayTextRef.current, { opacity: 1 - self.progress });
          }
        },
      });
      triggers.push(overlayTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Get translations for current language
  const t = translations[currentLang];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-forest-dark"
    >
      {/* Layer 1: Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark via-forest-dark to-forest-mid opacity-60" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroConfig.heroImage}
          alt={t.hero.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 via-forest-dark/40 to-forest-dark" />
      </div>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 2: Center Content */}
      <div
        ref={modelRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 will-change-transform px-4"
      >
        {/* Logo - BIGGER */}
        <div className="mb-4">
          <img
            src="/logo.png"
            alt="Casa do Brasil"
            className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Subtitle - BIGGER */}
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif italic text-white text-center mb-10 drop-shadow-lg">
          {t.hero.subtitle}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href={heroConfig.ctaHref}
            className="cta-button flex items-center gap-2 text-lg"
          >
            <Calendar className="w-5 h-5" />
            {t.hero.cta}
          </a>
          <a
            href="tel:08-6323032"
            className="inline-flex items-center gap-2 px-6 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 text-lg"
          >
            <Phone className="w-5 h-5" />
            08-6323032
          </a>
        </div>
      </div>

      {/* Navigation - fixed, background only when scrolled */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-3 md:py-4 transition-all duration-300 ${
          hasScrolled ? 'bg-forest-dark/50 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand - Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Casa do Brasil"
              className="h-10 md:h-11 w-auto object-contain drop-shadow-lg"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {heroConfig.navLinks.map((link) => {
              const label = t.nav[link.key];
              return link.href.startsWith('http') ? (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 text-sm font-body hover:text-white transition-colors duration-300"
                >
                  {label}
                </a>
              ) : link.href.startsWith('#') ? (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-white/80 text-sm font-body hover:text-white transition-colors duration-300"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-white/80 text-sm font-body hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="lang-switcher hidden sm:flex">
              <button
                onClick={() => setCurrentLang('he')}
                className={`lang-btn ${currentLang === 'he' ? 'active' : ''}`}
              >
                עברית
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-forest-dark/95 backdrop-blur-lg py-6 px-6">
            <div className="flex flex-col gap-4">
              {heroConfig.navLinks.map((link) => {
                const label = t.nav[link.key];
                return link.href.startsWith('http') ? (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/80 text-lg font-body hover:text-white transition-colors duration-300 py-2"
                  >
                    {label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/80 text-lg font-body hover:text-white transition-colors duration-300 py-2"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={link.key}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/80 text-lg font-body hover:text-white transition-colors duration-300 py-2"
                  >
                    {label}
                  </Link>
                );
              })}
              {/* Mobile Language Switcher */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentLang('he')}
                  className={`lang-btn ${currentLang === 'he' ? 'active' : ''}`}
                >
                  עברית
                </button>
                <button
                  onClick={() => setCurrentLang('en')}
                  className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
