import React, { createContext, useContext, useState } from "react";

export type Preferences = {
  experiences: string[];
  budget: string;
  dateRange: { start: string; end: string };
  travelType: string;
  activityLevel: number;
  transport: string[];
  showLocalRecommendations: boolean;
};

const defaultPreferences: Preferences = {
  experiences: [],
  budget: "",
  dateRange: { start: "", end: "" },
  travelType: "",
  activityLevel: 1,
  transport: [],
  showLocalRecommendations: true,
};

const PreferencesContext = createContext<{
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
  resetPreferences: () => void;
} | null>(null);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const resetPreferences = () => setPreferences(defaultPreferences);
  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences, resetPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}; 