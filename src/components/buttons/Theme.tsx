/* Dark/Light Theme buttons */

import { darkmodeIcon, lightmodeIcon } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

const Theme = () => {
  const { darkmode, changeTheme } = useTheme();

  console.log("darkmode is: ", darkmode);
  return (
    <div role="button">
      {darkmode ? (
        <span onClick={changeTheme}>{lightmodeIcon}</span>
      ) : (
        <span onClick={changeTheme}>{darkmodeIcon}</span>
      )}
    </div>
  );
};

export default Theme;
