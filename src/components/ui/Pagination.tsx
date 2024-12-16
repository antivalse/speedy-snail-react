/* Pagination Component */

import { arrowLeft, arrowRight } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  // Access darkmode context
  const { darkmode } = useTheme();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination flex justify-center items-center gap-6 mt-10 p-10">
      <button
        className={`pagination__arrow cursor-pointer ${
          darkmode ? "pagination__arrow--lighter" : ""
        } ${currentPage === 1 ? "opacity-15" : ""}`}
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        {arrowLeft}
      </button>
      <div
        className={`pagination__current-page  flex items-center justify-center ${
          darkmode ? "bg-p100 color-p300" : "bg-p300 color-p100"
        }`}
      >
        <span>{currentPage}</span>
      </div>
      <button
        className={`pagination__arrow cursor-pointer ${
          darkmode ? "pagination__arrow--lighter" : ""
        }`}
        onClick={handleNextPage}
      >
        {arrowRight}
      </button>
    </div>
  );
};

export default Pagination;
