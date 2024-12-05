/* Context for setting dark/light mode */

import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemContextProviderProps {
  children: React.ReactNode;
}

const ThemContextProvider: React.FC<ThemContextProviderProps> = ({
  children,
}) => {
  const [darkmode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false; // Convert to boolean or default to false if no value is found in localStorage
  });

  // Function to change the theme from dark to light and vice versa
  // prevDarkMode represents the current state value
  const changeTheme = () => {
    setDarkMode((prevDarkmode: boolean) => {
      const newDarkMode = !prevDarkmode;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode)); // Save to localStorage
      return newDarkMode;
    });
  };

  // Sync state with localStorage on component initialization
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkmode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemContextProvider;
