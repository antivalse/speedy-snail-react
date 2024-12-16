/* Image Gallery Page */

import Pagination from "../../components/ui/Pagination";
import useGetImages from "../../hooks/useGetImages";
import { useState } from "react";
import useGetCategories from "../../hooks/useGetCategories";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SortByCategory from "../../components/content/SortByCategory";
import useTheme from "../../hooks/useTheme";
import Assistant from "../../components/content/Assistant";
import { imageGalleryMessage } from "../../assets/infoMessages";
import useGetDefaultImages from "../../hooks/useGetDefaultImages";

const ImageGalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Images");
  const [currentPage, setCurrentPage] = useState<number>(1); // State to manage current page
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(imageGalleryMessage);
  const [selectedDataType, setSelectedDataType] =
    useState<string>("Personal Images");
  const [showCategories, setShowCategories] = useState<boolean>(false);

  // Get user personal image data from Firebase and store in variable
  const { userImages } = useGetImages();

  // Get default images
  const { defaultImages } = useGetDefaultImages();

  // Access darkmode context
  const { darkmode } = useTheme();

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Determine images to display based on selected data type (Personal or Default)
  const imagesToDisplay =
    selectedDataType === "Personal Images" ? userImages : defaultImages;

  // Filter images array based on active category
  const filteredImages = imagesToDisplay?.filter(
    (image) => image.category === activeCategory
  );

  // Use filtered images unless active category is default "All Images"
  const finalImagesToDisplay =
    activeCategory !== "All Images" ? filteredImages : imagesToDisplay;

  // Function to handle selection of new category and fake loading state
  const handleSelection = (category: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setLoading(false);
    }, 1000);
  };

  // Function to handle radio button change and set selected data type
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDataType(event.target.value);
  };

  return (
    <>
      <Assistant message={message} />

      <div
        className={`image-gallery p-10 mt-8 flex flex-col ${
          darkmode ? "bg-p300" : "bg-p100"
        }`}
      >
        <div className="self-center flex gap-3">
          {/* Radio buttons to toggle between Personal and Default Images */}
          <input
            type="radio"
            id="personal"
            name="data_type"
            value="Personal Images"
            checked={selectedDataType === "Personal Images"}
            onChange={handleRadioChange}
          />
          <label htmlFor="personal">Personal Images</label>
          <input
            type="radio"
            id="default"
            name="data_type"
            value="Default Images"
            checked={selectedDataType === "Default Images"}
            onChange={handleRadioChange}
          />
          <label htmlFor="default">Default Images</label>
        </div>

        <div className="image-gallery__sorting flex justify-between items-center pt-10">
          <h2
            className={`heading heading--primary py-3 ${
              darkmode ? "color-p50" : "color-p300"
            }`}
          >
            Category:{" "}
            <span className={` ${darkmode ? "color-s500" : "color-p200"}`}>
              {activeCategory}
            </span>
          </h2>
          <SortByCategory
            data={categoriesArray}
            handleSelection={handleSelection}
            showCategories={showCategories}
            setShowCategories={setShowCategories}
          />
        </div>

        {finalImagesToDisplay && finalImagesToDisplay?.length > 0 ? (
          <ul className="image-gallery__images grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 my-10">
            {finalImagesToDisplay?.map((item, index) => (
              <li
                key={index}
                className={`${
                  item.isDefault
                    ? "image-gallery__images__list-item--default"
                    : "image-gallery__images__list-item cursor-pointer"
                } flex flex-col items-center bg-p50 pb-5`}
              >
                <h3 className="body body--secondary color-p200 my-5">
                  {item.title}
                </h3>
                {item.isDefault ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="image-gallery__images__image"
                    onClick={() =>
                      setMessage("You can only click on your personal images!")
                    }
                  />
                ) : (
                  <Link to={`/edit-image/${item._id}`}>
                    <img
                      src={item.url}
                      alt={item.title}
                      className="image-gallery__images__image"
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="color-p300 italic">No images found in this category</p>
        )}

        {/* Pagination: only paginate personal images bc default are limited in amount*/}

        {selectedDataType === "Personal Images" && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        {loading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default ImageGalleryPage;
