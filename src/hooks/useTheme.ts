/* Custom hook for handling darkmode setting */

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const darkModeContext = useContext(ThemeContext);
  if (!darkModeContext) {
    throw new Error("Something went wrong when trying to use DarkModeContext");
  }

  return darkModeContext;
};

export default useTheme;
