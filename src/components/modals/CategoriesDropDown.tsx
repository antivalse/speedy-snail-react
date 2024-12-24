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
      className="categories-dropdown"
      style={{ top: "25%", transform: "translateY(-50%)" }} // Center vertically
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
