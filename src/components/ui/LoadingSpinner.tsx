/* Loading spinner component */

import SnailLogo from "../../assets/images/logos/speedy_snail_footerlogo.svg";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <img className="loading-spinner__spinner" src={SnailLogo} />
      <span className="hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
