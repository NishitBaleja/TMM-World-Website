"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { siteContent as enContent } from "./content";
import { siteContent as frContent } from "./content_fr";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && (savedLang === "en" || savedLang === "fr")) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (lang === "en" || lang === "fr") {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  useEffect(() => {
    const gsapModule = require("./gsap");
    const ScrollTriggerInstance = gsapModule.ScrollTrigger;
    if (ScrollTriggerInstance) {
      // Delay refresh briefly to let React finish committing DOM state changes
      const timer = setTimeout(() => {
        ScrollTriggerInstance.refresh();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [language]);

  const content = language === "fr" ? frContent : enContent;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en",
      changeLanguage: () => {},
      content: enContent,
    };
  }
  return context;
}
