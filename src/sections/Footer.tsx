import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Facebook, type LucideIcon } from 'lucide-react';
import { footerConfig, footerNavLinks, translations, type Language } from '../config';

gsap.registerPlugin(ScrollTrigger);

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const iconMap: Record<string, LucideIcon | typeof TikTokIcon> = {
  Instagram,
  Twitter,
  Facebook,
  TikTok: TikTokIcon,
};

interface FooterProps {
  currentLang: Language;
}

export function Footer({ currentLang }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!footerConfig.logoText && !footerConfig.email && footerNavLinks.length === 0) return null;

  const t = translations[currentLang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo — scale up + fade
      ScrollTrigger.create({
        trigger: logoRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            logoRef.current,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Content — fade up
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          );
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full bg-white pt-24 md:pt-32 pb-8 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Massive Logo */}
        {footerConfig.logoText && (
          <div ref={logoRef} className="opacity-0 mb-16 md:mb-24 overflow-visible">
            <svg
              viewBox="0 0 1000 100"
              className="w-full h-auto max-h-[25vh] min-w-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                textLength="900"
                lengthAdjust="spacingAndGlyphs"
                className="fill-softblack font-sans font-extrabold"
                style={{
                  fontSize: '90px',
                  letterSpacing: '-0.03em',
                }}
              >
                {footerConfig.logoText}
              </text>
            </svg>
          </div>
        )}

        {/* Footer Content */}
        <div ref={contentRef} className="opacity-0">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
            {/* Contact Info */}
            <div>
              <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
                {t.contact.title}
              </p>
              {footerConfig.email && (
                <a
                  href={`mailto:${footerConfig.email}`}
                  className="text-xl md:text-2xl font-sans font-semibold text-softblack hover:text-softblack/70 transition-colors duration-300"
                >
                  {footerConfig.email}
                </a>
              )}
              <p className="mt-4 text-softblack/60 font-body text-sm whitespace-pre-line">
                {t.contact.address}
              </p>
              <p className="mt-2 text-softblack/60 font-body text-sm">
                {t.contact.hours}
              </p>
              <a
                href="tel:08-6323032"
                className="mt-4 inline-flex items-center gap-2 text-[#b91c1c] font-sans font-semibold hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                08-6323032
              </a>
            </div>

            {/* Navigation */}
            {footerNavLinks.length > 0 && (
              <div>
                <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
                  {t.footer.navigationLabel}
                </p>
                <nav className="space-y-3">
                  {footerNavLinks.map((link) => {
                    const label = t.nav[link.key];
                    return link.href.startsWith('http') ? (
                      <a
                        key={link.key}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-softblack/80 hover:text-softblack font-body transition-colors duration-300"
                      >
                        {label}
                      </a>
                    ) : link.href.startsWith('#') ? (
                      <a
                        key={link.key}
                        href={link.href}
                        className="block text-softblack/80 hover:text-softblack font-body transition-colors duration-300"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        key={link.key}
                        to={link.href}
                        className="block text-softblack/80 hover:text-softblack font-body transition-colors duration-300"
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Social Links */}
            <div>
              <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
                {t.footer.socialLabel}
              </p>
              {footerConfig.socialLinks.length > 0 && (
                <div className="flex items-center justify-start gap-4" dir="ltr">
                  {footerConfig.socialLinks.map((social) => {
                    const Icon = iconMap[social.iconName] || Facebook;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-offwhite flex items-center justify-center text-softblack/70 hover:bg-[#b91c1c] hover:text-white transition-all duration-300"
                      >
                        {social.iconName === 'TikTok' ? (
                          <Icon className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
              <p className="mt-6 text-softblack/40 font-body text-sm whitespace-pre-line">
                {t.footer.tagline}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-softblack/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-softblack/40 font-body text-sm">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6 text-softblack/40 font-body text-sm">
              <a href="#" className="hover:text-softblack transition-colors duration-300">
                {t.footer.accessibilityStatement}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-offwhite to-transparent pointer-events-none" />
    </footer>
  );
}
