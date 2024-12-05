/* Context for setting dark/light mode */

import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  darkmode: boolean;
  changeTheme: () => void;
}

interface ThemContextProviderProps {
  children: React.ReactNode;
}

// Create context
const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemContextProvider: React.FC<ThemContextProviderProps> = ({
  children,
}) => {
  const [darkmode, setDarkmode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkmode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false; // Convert to boolean or default to false if no value is found in localStorage
  });

  // Function to change the theme from dark to light and vice versa
  // prevDarkMode represents the current state value
  const changeTheme = () => {
    setDarkmode((prevDarkmode: boolean) => {
      const newDarkmode = !prevDarkmode;
      localStorage.setItem("darkMode", JSON.stringify(newDarkmode)); // Save to localStorage
      return newDarkmode;
    });
  };

  // Sync state with localStorage on component initialization
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkmode(JSON.parse(savedDarkMode));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkmode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemContextProvider;
