import { createContext, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Language = "ar" | "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({ 
  language: "en", 
  setLanguage: () => {} 
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const { i18n } = useTranslation();

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
