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
      className="absolute top-1/4 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
      style={{ transform: "translateY(-50%)" }} // Center vertically
      role="listbox"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div role="listbox">
        {data?.map((category) => (
          <option
            key={category._id}
            value={category.title}
            role="option"
            aria-selected="false"
            className="form-dropdown__option body body--secondary cursor-pointer color-p300 my-1 text-center"
            onClick={() => handleSelectFn(category.title)}
          >
            {category.title}
          </option>
        ))}
      </div>
    </div>
  );
};

export default CategoriesDropDown;
