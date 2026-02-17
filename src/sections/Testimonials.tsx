import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
// @ts-ignore
import 'swiper/css';
import { translations, type Language } from '../config';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }: { rating: 4.5 | 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 text-amber-400 ${
            i <= rating ? 'fill-amber-400' : i === 5 && rating === 4.5 ? 'fill-amber-400/60' : 'fill-amber-400/20'
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

interface TestimonialsProps {
  currentLang: Language;
}

export function Testimonials({ currentLang }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  const t = translations[currentLang];
  const testimonials = t.testimonials;

  // Duplicate items for smooth infinite loop (Swiper needs enough slides)
  const loopItems = [...testimonials.items, ...testimonials.items, ...testimonials.items];

  if (!testimonials.titleRegular && testimonials.items.length === 0) return null;

  // Measure cards and set height to the tallest one
  useEffect(() => {
    const measure = () => {
      const cards = document.querySelectorAll('[data-testimonial-card]');
      if (cards.length === 0) return;
      let maxH = 0;
      cards.forEach((el) => {
        const h = (el as HTMLElement).scrollHeight;
        if (h > maxH) maxH = h;
      });
      setCardHeight(maxH);
    };
    const timer = setTimeout(measure, 100);
    const ro = new ResizeObserver(measure);
    carouselRef.current && ro.observe(carouselRef.current);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [loopItems, currentLang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — slide up
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Carousel — fade up
      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            carouselRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger when language changes (content/layout may change)
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [currentLang]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div ref={headerRef} className="text-center opacity-0">
          {testimonials.subtitle && (
            <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
              {testimonials.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-softblack tracking-tight">
            {testimonials.titleRegular} <span className="font-serif italic font-normal text-softblack/70">{testimonials.titleItalic}</span>
          </h2>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div ref={carouselRef} className="relative opacity-0">
        <Swiper
          key={currentLang}
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={2}
          loop={true}
          loopAdditionalSlides={4}
          speed={600}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          className="!px-6"
        >
          {loopItems.map((item, idx) => (
            <SwiperSlide key={`${item.id}-${idx}`}>
              <div
                data-testimonial-card
                className="bg-offwhite rounded-lg p-8 md:p-10 min-h-[320px] flex flex-col border border-softblack/5"
                style={cardHeight ? { height: cardHeight } : undefined}
                dir={currentLang === 'he' ? 'rtl' : 'ltr'}
              >
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-softblack/10 mb-4 shrink-0" strokeWidth={1} />

                {/* Quote text - full text, no truncation */}
                <p
                  className="text-softblack/80 font-body text-base md:text-lg leading-relaxed mb-8 flex-1 text-start"
                  dir={currentLang === 'he' ? 'rtl' : 'ltr'}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author - stars מול (opposite) the name */}
                <div className="shrink-0 flex items-center justify-between gap-4">
                  <StarRating rating={item.rating as 4.5 | 5} />
                  <div className="text-end">
                    <p className="font-sans font-semibold text-softblack">
                      {item.name}
                    </p>
                    <p className="text-sm text-softblack/50 font-body">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Decorative element */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-softblack/10 to-transparent" />
      </div>
    </section>
  );
}
