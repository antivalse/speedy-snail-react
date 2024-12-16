/* Pagination Component */

import { arrowLeft, arrowRight } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasMore,
  handleNextPage,
  handlePreviousPage,
}) => {
  // Access darkmode context
  const { darkmode } = useTheme();

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
        }  ${!hasMore ? "opacity-15" : ""}`}
        onClick={handleNextPage}
        disabled={!hasMore}
      >
        {arrowRight}
      </button>
    </div>
  );
};

export default Pagination;
