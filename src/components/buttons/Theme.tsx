/* Dark/Light Theme buttons */

import { darkmodeIcon, lightmodeIcon } from "../../assets/icons";

const Theme = () => {
  return (
    <div role="button">
      <span>{lightmodeIcon}</span> <span>{darkmodeIcon}</span>
    </div>
  );
};

export default Theme;
