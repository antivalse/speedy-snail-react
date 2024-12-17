/* Div and Button for Sorting Images by Category */

import { arrowDown, arrowUp } from "../../assets/icons";
import { Category } from "../../types/Category.types";

interface SortByCategoryProps {
  data: Category[] | null;
  handleSelection: (value: string) => void;
  showCategories: boolean;
  setShowCategories: (value: boolean) => void;
}

const SortByCategory: React.FC<SortByCategoryProps> = ({
  data,
  handleSelection,
  setShowCategories,
  showCategories,
}) => {
  return (
    <div className="relative">
      <button
        className="btn btn--sort flex justify-center items-center gap-2 color-p300"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => setShowCategories(!showCategories)}
      >
        SORT<span>{!showCategories ? arrowDown : arrowUp}</span>
      </button>
      {showCategories && (
        <div
          className="absolute mt-5 right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onClick={() => setShowCategories(!showCategories)}
        >
          <ul className="py-1" role="none">
            <li
              key="default_category"
              className="block px-4 py-2 text-sm color-p300 cursor-pointer"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
              onClick={() => handleSelection("All")}
            >
              All
            </li>
            {data?.map((item) => (
              <li
                key={item._id}
                className="block px-4 py-2 text-sm color-p300 cursor-pointer"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
                onClick={() => handleSelection(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}{" "}
    </div>
  );
};

export default SortByCategory;
