/* Add New Image Form Component */

import { useState } from "react";
import {
  arrowDown,
  arrowUp,
  editImageIcon,
  plusIcon,
} from "../../assets/icons";
import useGetCategories from "../../hooks/useGetCategories";
import SubmitButton from "../buttons/SubmitButton";
import { useUploadImage } from "../../hooks/useUploadImage";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Image } from "../../types/Image.types";
import handleInputChange from "../../utils/helpers/handleInputChange";
import CategoriesDropDown from "../modals/CategoriesDropDown";

interface ImageFormProps {
  heading: string;
  btnText: string;
  isAddNew: boolean;
  imageData?: Image | null;
}

const UploadImageForm: React.FC<ImageFormProps> = ({
  heading,
  btnText,
  isAddNew,
  imageData,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [file, setFile] = useState<{
    file: File | null;
    preview: string | null;
  }>({
    file: null,
    preview: null,
  });

  // Get categories from database
  const { data } = useGetCategories();

  // Access user
  const { user } = useAuth();

  // Access upload image hook
  const { uploadImage, isUploading } = useUploadImage();

  // Navigate
  const navigate = useNavigate();

  // Handle selection of category in dropdown
  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  // Handle form submittion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file.file) {
      setError("Please add an image.");
      return; // Prevent submission if no file is selected
    }

    // Validate category selection
    if (isAddNew && !title) {
      setError("Please enter a title.");
      return;
    }
    // Validate category selection
    if (isAddNew && !selectedCategory) {
      setError("Please select a category.");
      return;
    }

    if (isAddNew) {
      // Call the uploadImage function if isAddNew is truthy
      await uploadImage(file.file, user?.uid, selectedCategory, title);
      navigate("/image-gallery");
    }

    // Reset form state after the upload attempt
    setSelectedCategory(null);
    setFile({ file: null, preview: null });
    setTitle(null);
    setError(null);
  };

  return (
    <div className="form mx-auto p-5 flex flex-col items-center gap-4 bg-p50">
      {isUploading && <LoadingSpinner />}
      <h2 className="heading heading--primary color-p300">{heading}</h2>
      <form
        className="form__image-form flex flex-col gap-4 max-w-md"
        onSubmit={handleSubmit}
      >
        <h3>Image</h3>
        {isAddNew ? (
          <div className="form__image-form__image-container">
            {file.preview ? (
              <img
                src={file.preview}
                alt="Uploaded Preview"
                className="form__add-image form__add-image--upload"
              />
            ) : (
              <label
                htmlFor="file-upload"
                className="form__add-image form__add-image--upload bg-p100 flex justify-center items-center border-dotted border-2 cursor-pointer"
              >
                <span>{plusIcon}</span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden" // Hide the input but keep it accessible
                  accept=".png,.jpg,.jpeg,.webp,image/png"
                  onChange={(e) => handleInputChange(e, setFile, setTitle)}
                />
              </label>
            )}
            {error && error.length > 0 && error.includes("image") && (
              <p>{error}</p>
            )}
          </div>
        ) : (
          <div className="relative">
            <span className="absolute top-2 right-2 cursor-pointer">
              {editImageIcon}
            </span>
            <img
              src={imageData?.url}
              alt={"Image"}
              className="form__add-image"
            />
          </div>
        )}
        <label className="color-p300" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="form__input-field form__input-field--text-center"
          minLength={3}
          onChange={(e) => handleInputChange(e, setFile, setTitle)}
        />

        {error && error.length > 0 && error.includes("title") && <p>{error}</p>}
        <div className="relative">
          <div
            className="form-dropdown flex items-center justify-center cursor-pointer"
            aria-expanded="true"
            aria-haspopup="true"
            role="combobox"
            onClick={() => setShowCategories(!showCategories)}
          >
            <p className="body body--secondary">
              {selectedCategory
                ? selectedCategory
                : imageData?.category
                ? imageData.category
                : "Categories"}
            </p>
            <span className="form-dropdown__icon p-5">
              {" "}
              {showCategories ? arrowUp : arrowDown}
            </span>
          </div>
          {showCategories && (
            <CategoriesDropDown data={data} handleSelectFn={handleSelect} />
          )}
          {error && error.length > 0 && error.includes("category") && (
            <p>{error}</p>
          )}
        </div>

        <SubmitButton
          className="btn btn--submit self-center"
          btnText={btnText}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default UploadImageForm;
