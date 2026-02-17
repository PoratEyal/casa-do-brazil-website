import { Link } from 'react-router-dom';
import { Flame, Beef, Salad, Wine, type LucideIcon } from 'lucide-react';
import { translations, type Language } from '../config';

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Beef,
  Salad,
  Wine,
};

interface MenuSectionProps {
  currentLang: Language;
}

export function MenuSection({ currentLang }: MenuSectionProps) {
  const t = translations[currentLang];
  const services = t.menu.services;
  if (!t.menu.titleLine1 && services.length === 0) return null;
  const isRtl = currentLang === 'he';

  const textDir = isRtl ? 'rtl' : 'ltr';
  const iconDir = isRtl ? 'ltr' : 'rtl';

  return (
    <section
      id="menu"
      className="relative w-full py-24 md:py-32 bg-forest-dark"
      dir={textDir}
      data-rtl={isRtl}
      style={{ direction: textDir }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Heading Column - Right in RTL, Left in LTR */}
          <div
            className={`md:order-1 ${isRtl ? 'text-right' : 'text-left'}`}
            dir={textDir}
            style={{ direction: textDir }}
          >
            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
              {t.menu.title}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-tight">
              {t.menu.titleLine1}
              <br />
              <span className="font-serif italic font-normal text-white/80">
                {t.menu.titleLine2Italic}
              </span>
            </h2>
            <p className={`mt-6 text-white/60 font-body text-base md:text-lg max-w-md leading-relaxed ${isRtl ? 'me-auto' : ''}`}>
              {t.menu.description}
            </p>
            <Link
              to="/menu"
              className={`mt-8 cta-button inline-flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              {t.menu.viewFullMenu}
            </Link>
          </div>

          {/* Services Grid Column - Left in RTL, Right in LTR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 md:order-2">
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Flame;
              return (
                <Link
                  key={index}
                  to="/menu"
                  className="service-card bg-forest-dark p-6 md:p-8 block"
                  dir={textDir}
                  style={{ direction: textDir }}
                >
                  <div className="mb-4" dir={iconDir} style={{ direction: iconDir }}>
                    <Icon className="w-8 h-8 text-white/70" strokeWidth={1.5} />
                  </div>
                  <div dir={textDir} style={{ direction: textDir }}>
                    <h3 className="text-lg md:text-xl font-sans font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/50 font-body leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
