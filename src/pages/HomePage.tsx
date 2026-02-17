import { useLenis } from '../hooks/useLenis';
import { Hero } from '../sections/Hero';
import { AboutSection } from '../sections/AboutSection';
import { MenuSection } from '../sections/MenuSection';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';
import { Footer } from '../sections/Footer';
import type { Language } from '../config';

interface HomePageProps {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

export function HomePage({ currentLang, setCurrentLang }: HomePageProps) {
  useLenis();

  return (
    <main className="relative w-full overflow-x-hidden">
      <Hero currentLang={currentLang} setCurrentLang={setCurrentLang} />
      <AboutSection currentLang={currentLang} />
      <MenuSection currentLang={currentLang} />
      <Testimonials currentLang={currentLang} />
      <FAQ currentLang={currentLang} />
      <Footer currentLang={currentLang} />
    </main>
  );
}
