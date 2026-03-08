import React, { createContext, useContext, useState, useEffect } from 'react';

export type SiteType = 'CityLight' | 'WordLight';

interface SiteContextType {
  currentSite: SiteType;
  setSite: (site: SiteType) => void;
  isWordLight: boolean;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSite, setCurrentSite] = useState<SiteType>('CityLight');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('church_theme_dark');
    return saved === 'true';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('church_theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('church_theme_dark', 'false');
    }
  }, [isDark]);

  const setSite = (site: SiteType) => {
    setCurrentSite(site);
    // Scroll to top when switching sites to give "new website" feel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SiteContext.Provider value={{ 
      currentSite, 
      setSite, 
      isWordLight: currentSite === 'WordLight',
      isDark,
      setIsDark
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
