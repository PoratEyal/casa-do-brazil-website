import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { introGridConfig, whyChooseMeConfig, translations, type Language } from '../config';

gsap.registerPlugin(ScrollTrigger);

function Counter({ end, suffix = '', duration = 2, shouldAnimate }: { end: number; suffix?: string; duration?: number; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    const startTime = Date.now();
    const endTime = startTime + (duration || 2) * 1000;
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / ((duration || 2) * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newCount = Math.floor(easeProgress * end);
      if (newCount !== countRef.current) {
        countRef.current = newCount;
        setCount(newCount);
      }
      if (now < endTime) requestAnimationFrame(updateCount);
      else setCount(end);
    };
    requestAnimationFrame(updateCount);
  }, [end, duration, shouldAnimate]);

  return <span>{count}{suffix}</span>;
}

// Per-image animation config: unique direction, rotation, parallax depth, stagger order
const imageAnimConfigs = [
  // img0: tall left — sweeps in from the left
  { clipFrom: 'inset(0% 100% 0% 0%)', rotation: -2, parallax: [-6, 6], delay: 0 },
  // img1: top center — drops in from above
  { clipFrom: 'inset(0% 0% 100% 0%)', rotation: 1.5, parallax: [-3, 3], delay: 0.12 },
  // img2: top right — slides in from the right
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.2, parallax: [-5, 5], delay: 0.08 },
  // img3: tall center — rises from below
  { clipFrom: 'inset(100% 0% 0% 0%)', rotation: 1, parallax: [-4, 4], delay: 0.22 },
  // img4: bottom right — slides in from the right
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.5, parallax: [-7, 7], delay: 0.18 },
  // img5: extra image — slides in from the left
  { clipFrom: 'inset(0% 100% 0% 0%)', rotation: 1.2, parallax: [-4, 4], delay: 0.14 },
];

interface AboutSectionProps {
  currentLang: Language;
}

export function AboutSection({ currentLang }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

  if (!introGridConfig.titleLine1 && !introGridConfig.titleLine2 && introGridConfig.portfolioImages.length === 0) return null;

  const t = translations[currentLang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Description: fade up ──
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.35 }
          );
        },
        once: true,
      });

      // Stats counter trigger
      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          onEnter: () => setShouldAnimateStats(true),
          once: true,
        });
      }

      // ── Grid images: per-image directional reveal + rotation + scale + parallax ──
      const gridItems = gridRef.current?.querySelectorAll('.grid-item');
      if (gridItems) {
        gridItems.forEach((item, i) => {
          const img = item.querySelector('img');
          const cfg = imageAnimConfigs[i];
          if (!cfg) return;

          // One-shot reveal on scroll-enter
          ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
              // Unhide (Tailwind opacity-0 used as pre-GSAP fallback)
              gsap.set(item, { opacity: 1 });

              // Clip-path directional reveal
              gsap.fromTo(
                item,
                { clipPath: cfg.clipFrom },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.3,
                  ease: 'power4.inOut',
                  delay: cfg.delay,
                }
              );

              if (img) {
                // Scale zoom-out (Ken Burns)
                gsap.fromTo(
                  img,
                  { scale: 1.45, rotate: cfg.rotation },
                  {
                    scale: 1.12,
                    rotate: 0,
                    duration: 1.8,
                    ease: 'power3.out',
                    delay: cfg.delay,
                  }
                );
              }
            },
            once: true,
          });

          // Continuous parallax (varied depth per image → layered 3D feel)
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: cfg.parallax[0] },
              {
                yPercent: cfg.parallax[1],
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Title ── */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-serif italic font-medium text-softblack tracking-wide mb-12 md:mb-16">
            <span className="relative">
              {t.about.title2}
              <span
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #c41e3a, transparent)',
                  opacity: 0.8,
                }}
              />
            </span>
          </h2>

          <p
            ref={textRef}
            className="text-base md:text-lg text-softblack/60 font-body leading-relaxed opacity-0"
          >
            {t.about.description}
          </p>
        </div>

        {/* Stats - אודות + למה לבחור בנו במספרים */}
        {whyChooseMeConfig.stats.length > 0 && (
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 py-8 md:py-12 border-y border-softblack/10"
          >
            {whyChooseMeConfig.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-sans font-bold text-softblack tracking-tight">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    shouldAnimate={shouldAnimateStats}
                  />
                </p>
                <p className="text-softblack/60 font-body text-sm mt-1">
                  {index === 0 ? t.stats.fromYear : index === 1 ? t.stats.years : index === 2 ? t.stats.reviews : t.stats.customers}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Masonry Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]"
        >
          {introGridConfig.portfolioImages.map((image, index) => (
            <div
              key={index}
              className={`grid-item relative overflow-hidden rounded-lg group cursor-pointer opacity-0 ${
                index === 0 ? 'md:col-span-1 md:row-span-2' : ''
              } ${index === 3 ? 'row-span-2' : ''}`}
            >
              <img
                src={encodeURI(image.src)}
                alt={t.about.portfolioAlts[index] ?? image.alt}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

              {/* Viewfinder corners on hover */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Floating accent text */}
        {introGridConfig.accentText && (
          <div className="mt-12 md:mt-16 flex justify-end">
            <p className="text-sm text-softblack/40 font-body tracking-wider uppercase">
              {introGridConfig.accentText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
