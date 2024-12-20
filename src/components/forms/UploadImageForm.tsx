/* Add New Image Form Component */

import { useState } from "react";
import { arrowDown, editImageIcon, plusIcon } from "../../assets/icons";
import useGetCategories from "../../hooks/useGetCategories";
import SubmitButton from "../buttons/SubmitButton";
import { useUploadImage } from "../../hooks/useUploadImage";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Image } from "../../types/Image.types";

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

  // Handle change on image input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile({
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      });
    }
  };

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
    <div className="form mx-auto p-12 flex flex-col items-center gap-12 bg-p50">
      {isUploading && <LoadingSpinner />}
      <h2 className="heading heading--primary color-p300">{heading}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {isAddNew ? (
          <div>
            <h3>Image</h3>
            {file.preview ? (
              <img
                src={file.preview}
                alt="Uploaded Preview"
                className="form__add-image bg-p100"
              />
            ) : (
              <label
                htmlFor="file-upload"
                className="form__add-image bg-p100 flex justify-center items-center mt-3 border-dotted border-2 cursor-pointer"
              >
                <span>{plusIcon}</span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden" // Hide the input but keep it accessible
                  accept=".png,.jpg,.jpeg,.webp,image/png"
                  onChange={handleChange}
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
          className="form__input-field"
          minLength={3}
          onChange={(e) => setTitle(e.target.value)}
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
            <p className="heading heading--primary">
              {selectedCategory
                ? selectedCategory
                : imageData?.category
                ? imageData.category
                : "Categories"}
            </p>
            <span className="form-dropdown__icon p-5">{arrowDown}</span>
          </div>
          {showCategories && (
            <div
              className="absolute right-3 mt-2 z-10 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
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
          {error && error.length > 0 && error.includes("category") && (
            <p>{error}</p>
          )}
        </div>

        <SubmitButton
          className="btn btn--submit self-center"
          btnText={btnText}
          onClick={() => handleSubmit}
        />
      </form>
    </div>
  );
};

export default UploadImageForm;
