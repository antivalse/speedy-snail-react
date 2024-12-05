/* Create a theme context */

import { createContext } from "react";

interface ThemeContextType {
  darkmode: boolean;
  changeTheme: () => void;
}

// Create context
export const ThemeContext = createContext<ThemeContextType | null>(null);
