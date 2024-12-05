/* Dark/Light Theme buttons */

import { darkmodeIcon, lightmodeIcon } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

interface ThemeProps {
  isDropdown: boolean;
}

const Theme: React.FC<ThemeProps> = ({ isDropdown }) => {
  const { darkmode, changeTheme } = useTheme();

  return (
    <div role="theme-buttons">
      {darkmode ? (
        <span
          className={`${
            isDropdown
              ? "theme-buttons__button theme-buttons__button--small cursor-pointer"
              : "theme-buttons__button cursor-pointer"
          }`}
          onClick={changeTheme}
        >
          {lightmodeIcon}
        </span>
      ) : (
        <span
          className={`${
            isDropdown
              ? "theme-buttons__button theme-buttons__button--small cursor-pointer"
              : "theme-buttons__button cursor-pointer"
          }`}
          onClick={changeTheme}
        >
          {darkmodeIcon}
        </span>
      )}
    </div>
  );
};

export default Theme;
