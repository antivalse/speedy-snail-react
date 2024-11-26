/* Pagination Component */

import { arrowLeft, arrowRight } from "../assets/icons";

const Pagination = () => {
  const currentPage = 1; // dynamically set this value based on state later

  return (
    <div className="pagination flex justify-center items-center gap-6 mt-10 p-10">
      <span className="pagination__arrow-left">{arrowLeft}</span>
      <div className="pagination__current-page bg-p300 color-p100 flex items-center justify-center">
        <span>{currentPage}</span>
      </div>
      <span className="pagination__arrow-right cursor-pointer">
        {arrowRight}
      </span>
    </div>
  );
};

export default Pagination;
