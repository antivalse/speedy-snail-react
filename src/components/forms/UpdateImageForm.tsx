/* Update Image Form */

import { useEffect, useState } from "react";
import { arrowDown, arrowUp } from "../../assets/icons";
import useGetCategories from "../../hooks/useGetCategories";
import SubmitButton from "../buttons/SubmitButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateImage from "../../hooks/useUpdateImage";
import { Image } from "../../types/Image.types";
import ConfirmationModal from "../modals/ConfirmationModal";
import { ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import useAuth from "../../hooks/useAuth";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import handleInputChange from "../../utils/helpers/handleInputChange";

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
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [file, setFile] = useState<{
    file: File | null;
    preview: string | null;
  }>({
    file: null,
    preview: imageData?.url || null,
  });

  const { user } = useAuth();

  // Get categories from database
  const { data } = useGetCategories();

  // Get id from params
  const { id } = useParams();

  // Access update image hook
  const { error, isUpdating, deleteImage, setError, updateImage } =
    useUpdateImage();

  // Navigate
  const navigate = useNavigate();

  // Decode the URL to be able to provide path for storage reference
  const decodedUrl = decodeURIComponent(imageData?.url || "");
  // Extract the filename
  const fileName = decodedUrl.split("/").pop()?.split("?")[0];
  // Store reference to image in storage
  const storageRef = ref(storage, `user_images/${user?.uid}/${fileName}`);

  // Handle selection of category in dropdown
  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  // Handle delete
  const handleDelete = () => {
    deleteImage(id, storageRef.toString());
    navigate("/image-gallery");
  };

  // Handle case where user choses to cancel delete in confirmation modal
  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const openConfirmationModal = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmationModal(true);
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
  };

  useEffect(() => {
    scrollToDiv("edit-heading");
  }, []);

  return (
    <div className="form mx-auto p-5 flex flex-col items-center gap-4 bg-p50">
      <h2 id="edit-heading" className="heading heading--primary color-p300">
        Edit Image Details
      </h2>
      <form
        className="form__image-form flex flex-col gap-4 max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="relative form__image-form__image-container">
          <label htmlFor="file">
            <div className="absolute top-0 image-overlay cursor-pointer flex justify-center items-center">
              <span className="body body--secondary color-p50 ">
                Change Image
              </span>
            </div>
            <input
              type="file"
              id="file"
              accept=".png,.jpg,.jpeg,.webp,image/png"
              className="hidden"
              onChange={(e) => handleInputChange(e, setFile, setTitle)}
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
          className="form__input-field form__input-field--text-center"
          minLength={3}
          placeholder={imageData?.title.toUpperCase() || ""}
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
              {showCategories ? arrowUp : arrowDown}
            </span>
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
        <div className="flex justify-center gap-5">
          {" "}
          <SubmitButton
            className="btn btn--submit self-center"
            btnText={btnText}
            onClick={handleSubmit}
          />{" "}
          <button
            className="btn btn--submit btn--submit--danger"
            onClick={openConfirmationModal}
          >
            Delete
          </button>
        </div>
      </form>

      {showConfirmationModal && (
        <ConfirmationModal
          heading="Are you sure you want to delete image?"
          textContent="Enter password before proceeding"
          onCancel={handleCancel}
          onConfirm={handleDelete}
        />
      )}
      {isUpdating && <LoadingSpinner />}
    </div>
  );
};

export default UpdateImageForm;
