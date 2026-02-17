import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { translations, type Language } from './config';
import './App.css';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('he');

  useEffect(() => {
    const t = translations[currentLang];
    if (t.siteTitle) document.title = t.siteTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && t.siteDescription) meta.setAttribute('content', t.siteDescription);
    document.documentElement.lang = currentLang === 'he' ? 'he' : 'en';
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
  }, [currentLang]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage currentLang={currentLang} setCurrentLang={setCurrentLang} />
        }
      />
      <Route
        path="/menu"
        element={
          <MenuPage currentLang={currentLang} setCurrentLang={setCurrentLang} />
        }
      />
    </Routes>
  );
}

export default App;
