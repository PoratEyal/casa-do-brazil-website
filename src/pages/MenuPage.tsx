import { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuCategories, type MenuCategory } from '../data/menu';
import { heroConfig, translations, type Language } from '../config';

interface MenuPageProps {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

export function MenuPage({ currentLang, setCurrentLang }: MenuPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(menuCategories[0]?.id ?? '');
  const t = translations[currentLang];

  const selectedCategory = menuCategories.find((c) => c.id === selectedCategoryId) ?? menuCategories[0];

  const getCategoryName = (cat: MenuCategory) => {
    return currentLang === 'he' ? cat.nameHe : cat.nameEn;
  };

  const getItemName = (item: { name: string; nameEn?: string }) =>
    currentLang === 'he' ? item.name : (item.nameEn ?? item.name);
  const getItemDesc = (item: { description?: string; descriptionEn?: string }) =>
    currentLang === 'he' ? item.description : (item.descriptionEn ?? item.description);
  const getItemSubtitle = (item: { subtitle?: string; subtitleEn?: string }) =>
    currentLang === 'he' ? item.subtitle : (item.subtitleEn ?? item.subtitle);
  const getItemDetails = (item: { details?: string[]; detailsEn?: string[] }) =>
    currentLang === 'he' ? item.details : (item.detailsEn ?? item.details);
  const getSubTitle = (sub: { title: string; titleEn?: string }) =>
    currentLang === 'he' ? sub.title : (sub.titleEn ?? sub.title);
  const getSubDesc = (sub: { description?: string; descriptionEn?: string }) =>
    currentLang === 'he' ? sub.description : (sub.descriptionEn ?? sub.description);
  const getSubCta = (sub: { ctaText?: string; ctaTextEn?: string }) =>
    currentLang === 'he' ? sub.ctaText : (sub.ctaTextEn ?? sub.ctaText);
  const getPriceDisplay = (price: string) => {
    if (price === 'מחיר לפי מנה') return t.fullMenu.pricePerItem;
    if (price === 'מחיר לפי משקל') return t.fullMenu.pricePerWeight;
    return price;
  };

  const isRtl = currentLang === 'he';

  return (
    <div
      className="min-h-screen bg-white"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-softblack/10 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <span
            className="text-xl font-bold text-softblack"
            style={{ fontFamily: "'Playfair Display', serif", color: '#c41e3a' }}
          >
            CASA DO BRASIL
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href={heroConfig.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#b91c1c] text-white text-sm font-medium rounded-full hover:bg-[#991b1b] transition-colors"
          >
            {t.fullMenu.bookTable}
          </a>
          <Link
            to="/"
            className="text-softblack/70 hover:text-softblack text-sm font-body"
          >
            {t.fullMenu.back}
          </Link>
          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentLang('he')}
              className={`px-2 py-1 text-sm rounded ${currentLang === 'he' ? 'bg-softblack/10 font-medium' : 'text-softblack/60 hover:text-softblack'}`}
            >
              עברית
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-2 py-1 text-sm rounded ${currentLang === 'en' ? 'bg-softblack/10 font-medium' : 'text-softblack/60 hover:text-softblack'}`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Menu Categories - Horizontal Cards */}
      <div className="px-6 py-8">
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          role="tablist"
          aria-label={t.fullMenu.categoriesLabel}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              role="tab"
              aria-selected={selectedCategoryId === category.id}
              aria-label={getCategoryName(category)}
              className={`flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden relative group transition-all ${
                selectedCategoryId === category.id
                  ? 'ring-2 ring-[#b91c1c] ring-offset-2'
                  : 'hover:opacity-90'
              }`}
            >
              <img
                src={category.image}
                alt={getCategoryName(category)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-2 right-2 left-2 text-white font-body text-sm font-medium text-center">
                {getCategoryName(category)}
              </span>
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="max-w-5xl mx-auto mt-8 border border-[#b91c1c]/30 rounded-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-serif italic text-softblack mb-6">
            {t.fullMenu.sectionTitle}
          </h2>
          <h3 className="text-xl font-sans font-bold text-softblack mb-8">
            {getCategoryName(selectedCategory)}
          </h3>

          {selectedCategory.subSections ? (
            <div className="space-y-10">
              {selectedCategory.subSections?.map((sub, subIdx) => (
                <div key={subIdx}>
                  <h4 className="text-lg font-sans font-semibold text-softblack mb-2">
                    {getSubTitle(sub)}
                  </h4>
                  {(sub.description || sub.descriptionEn) && (
                    <p className="text-softblack/70 font-body text-sm mb-4 leading-relaxed">
                      {getSubDesc(sub)}
                    </p>
                  )}
                  {(sub.ctaText || sub.ctaTextEn) && (
                    <p className="text-[#b91c1c] font-body text-sm underline mb-4">
                      {getSubCta(sub)}
                    </p>
                  )}
                  {sub.layout === 'grid' && sub.items.length === 2 ? (
                    <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center">
                      <div className="flex-1 border border-softblack/10 rounded-lg p-4">
                        <h5 className="font-sans font-semibold text-softblack">
                          {getItemName(sub.items[0])}
                        </h5>
                        {(sub.items[0].subtitle || sub.items[0].subtitleEn) && (
                          <p className="text-sm text-softblack/60 mt-1">
                            {getItemSubtitle(sub.items[0])}
                          </p>
                        )}
                        <p className="font-sans font-medium text-softblack mt-2">
                          {getPriceDisplay(sub.items[0].price)} {t.fullMenu.perDiner}
                        </p>
                        {(sub.items[0].details || sub.items[0].detailsEn) && (
                          <ul className="mt-2 text-sm text-softblack/70 space-y-1">
                            {(getItemDetails(sub.items[0]) ?? []).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex md:flex-shrink-0 items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-[#b91c1c] text-white text-xs font-bold flex items-center justify-center">
                          {t.fullMenu.or}
                        </span>
                      </div>
                      <div className="flex-1 border border-softblack/10 rounded-lg p-4">
                        <h5 className="font-sans font-semibold text-softblack">
                          {getItemName(sub.items[1])}
                        </h5>
                        {(sub.items[1].subtitle || sub.items[1].subtitleEn) && (
                          <p className="text-sm text-softblack/60 mt-1">
                            {getItemSubtitle(sub.items[1])}
                          </p>
                        )}
                        <p className="font-sans font-medium text-softblack mt-2">
                          {getPriceDisplay(sub.items[1].price)} {t.fullMenu.perDiner}
                        </p>
                        {(sub.items[1].details || sub.items[1].detailsEn) && (
                          <ul className="mt-2 text-sm text-softblack/70 space-y-1">
                            {(getItemDetails(sub.items[1]) ?? []).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sub.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="border-b border-dotted border-softblack/20 pb-4 last:border-0"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-sans font-semibold text-softblack">
                                {getItemName(item)}
                              </h5>
                              {(item.description || item.descriptionEn) && (
                                <p className="text-sm text-softblack/60 font-body mt-1">
                                  {getItemDesc(item)}
                                </p>
                              )}
                            </div>
                            <span className="font-sans font-medium text-softblack flex-shrink-0">
                              {getPriceDisplay(item.price)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {selectedCategory.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="border-b border-dotted border-softblack/20 pb-6 last:border-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-semibold text-softblack">
                        {getItemName(item)}
                      </h4>
                      {(item.description || item.descriptionEn) && (
                        <p className="text-sm text-softblack/60 font-body mt-1">
                          {getItemDesc(item)}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <span className="font-sans font-medium text-softblack">
                        {getPriceDisplay(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer note */}
      <div className="px-6 py-8 mt-8 border-t border-softblack/10">
        <p className="text-center text-sm text-softblack/50 font-body">
          {t.fullMenu.meatNote}
        </p>
      </div>
    </div>
  );
}
