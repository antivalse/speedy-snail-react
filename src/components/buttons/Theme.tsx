/* Dark/Light Theme buttons */

import { darkmodeIcon, lightmodeIcon } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

const Theme = () => {
  const { darkmode, changeTheme } = useTheme();

  console.log("darkmode is: ", darkmode);
  return (
    <div role="theme-buttons">
      {darkmode ? (
        <span
          className="theme-buttons__button cursor-pointer"
          onClick={changeTheme}
        >
          {lightmodeIcon}
        </span>
      ) : (
        <span
          className="theme-buttons__button cursor-pointer"
          onClick={changeTheme}
        >
          {darkmodeIcon}
        </span>
      )}
    </div>
  );
};

export default Theme;
