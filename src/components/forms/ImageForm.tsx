/* Add New Image Form Component */

import { useState } from "react";
import { arrowDown, editImageIcon, plusIcon } from "../../assets/icons";
import PlaceholderImg from "../../assets/images/placeholders/scheduleimg_test.png";
import useGetCategories from "../../hooks/useGetCategories";
import SubmitButton from "../buttons/SubmitButton";

interface ImageFormProps {
  heading: string;
  btnText: string;
  isAddNew: boolean;
}

const ImageForm: React.FC<ImageFormProps> = ({
  heading,
  btnText,
  isAddNew,
}) => {
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Get categories from database
  const { data } = useGetCategories();

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  return (
    <div className="form mx-auto p-12 flex flex-col items-center gap-12">
      <h2 className="heading heading--primary color-p300">{heading}</h2>
      <form className="flex flex-col gap-4">
        {isAddNew ? (
          <div>
            <h3>Image</h3>
            <div className="form__add-image bg-p100 flex justify-center items-center mt-3 cursor-pointer">
              <span>{plusIcon}</span>
            </div>
          </div>
        ) : (
          <div className="relative">
            <span className="absolute top-2 right-2 cursor-pointer">
              {editImageIcon}
            </span>
            <img src={PlaceholderImg} alt="Image" />
          </div>
        )}
        <label className="color-p300" htmlFor="title">
          Title
        </label>
        <input type="text" className="form__input-field" />
        <div className="relative">
          <div
            className="form-dropdown flex items-center justify-center cursor-pointer"
            aria-expanded="true"
            aria-haspopup="true"
            role="combobox"
            onClick={() => setShowCategories(!showCategories)}
          >
            <p className="heading heading--primary">
              {selectedCategory ? selectedCategory : "Categories"}
            </p>
            <span className="form-dropdown__icon p-5">{arrowDown}</span>
          </div>
          {showCategories && (
            <div
              className="absolute right-3 mt-2 z-10 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="listbox"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div role="listbox" className="dropdown-options">
                {data?.map((category) => (
                  <option
                    key={category._id}
                    value={category.title}
                    role="option"
                    aria-selected="false"
                    className="cursor-pointer color-p300 my-2"
                    onClick={() => handleSelect(category.title)}
                  >
                    {category.title}
                  </option>
                ))}
              </div>
            </div>
          )}
        </div>

        <SubmitButton
          className="btn btn--submit self-center"
          btnText={btnText}
        />
      </form>
    </div>
  );
};

export default ImageForm;
