/* Dropdown menu for categories */

import { Category } from "../../types/Category.types";

interface CategoriesDropDownProps {
  data: Category[] | null;
  handleSelectFn: (category: string) => void;
}

const CategoriesDropDown: React.FC<CategoriesDropDownProps> = ({
  data,
  handleSelectFn,
}) => {
  return (
    <div
      className="absolute mt-5 left-1/2 transform -translate-x-1/2 z-10 w-56 origin-top rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <ul className="py-1" role="none">
        {data?.map((category) => (
          <li
            key={category._id}
            value={category.title}
            role="menuitem"
            aria-selected="false"
            tabIndex={-1}
            className="form-dropdown__option body body--secondary cursor-pointer color-p300 my-1 text-center block"
            onClick={() => handleSelectFn(category.title)}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesDropDown;
