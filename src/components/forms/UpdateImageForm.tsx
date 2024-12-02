/* Update Image Form */

import { useState } from "react";
import { arrowDown, editImageIcon } from "../../assets/icons";
import useGetCategories from "../../hooks/useGetCategories";
import SubmitButton from "../buttons/SubmitButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateImage from "../../hooks/useUpdateImage";
import { Image } from "../../types/Image.types";

interface ImageFormProps {
  btnText: string;
  imageData: Image | null;
}

const UpdateImageForm: React.FC<ImageFormProps> = ({ btnText, imageData }) => {
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    imageData?.category || null
  );
  const [title, setTitle] = useState<string | null>(imageData?.title || null);
  const [file, setFile] = useState<{
    file: File | null;
    preview: string | null;
  }>({
    file: null,
    preview: imageData?.url || null,
  });

  // Get categories from database
  const { data } = useGetCategories();

  // Get id from params

  const { id } = useParams();

  // Access update image hook
  const { updateImage, isUpdating, error, setError } = useUpdateImage();

  // Navigate
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
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

    try {
      await updateImage(
        id,
        file.file || undefined,
        selectedCategory !== imageData?.category ? selectedCategory : undefined,
        title !== imageData?.title ? title : undefined
      );

      navigate("/image-gallery");
      setSelectedCategory(null);
      setFile({ file: null, preview: null });
      setTitle(null);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError("Failed to update image. Please try again.");
      }
    }

    console.log("Form successfully submitted and reset.");
  };

  return (
    <div className="form mx-auto p-12 flex flex-col items-center gap-12">
      {isUpdating && <LoadingSpinner />}
      <h2 className="heading heading--primary color-p300">
        Edit Image Details
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="file-upload">
            <span className="absolute top-2 right-2 cursor-pointer">
              {editImageIcon}
            </span>

            <input
              type="file"
              id="file"
              accept=".png,.jpg,.jpeg,.webp,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {file.preview ? (
            <img src={file.preview} alt="Preview" className="form__add-image" />
          ) : (
            <img
              src={imageData?.url}
              alt="Preview"
              className="form__add-image"
            />
          )}
        </div>

        <label className="color-p300" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="form__input-field"
          minLength={3}
          placeholder={imageData?.title || ""}
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

export default UpdateImageForm;
