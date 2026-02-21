import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { translations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const [lang, setLang] = useState("es");

  useEffect(() => {
    if (location.pathname.startsWith("/en")) {
      setLang("en");
    } else {
      setLang("es");
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const translation = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, translation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);