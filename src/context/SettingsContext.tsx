"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Settings {
  phone: string;
  email: string;
}

interface SettingsContextType {
  settings: Settings;
  isLoading: boolean;
}

const defaultSettings = {
  phone: "976-88087744",
  email: "info@brcd-mongolia.org",
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings({
            phone: data.phone || defaultSettings.phone,
            email: data.email || defaultSettings.email,
          });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch settings", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
