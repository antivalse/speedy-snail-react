/* Image Gallery Page */

import Pagination from "../../components/ui/Pagination";
import { useEffect, useState } from "react";
import useGetCategories from "../../hooks/useGetCategories";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SortByCategory from "../../components/content/SortByCategory";
import useTheme from "../../hooks/useTheme";
import Assistant from "../../components/content/Assistant";
import { imageGalleryMessage } from "../../assets/infoMessages";
import useGetDefaultImages from "../../hooks/useGetDefaultImages";
import usePaginatedImages from "../../hooks/usePaginatedImages";

const ImageGalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1); // State to manage current page
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(imageGalleryMessage);
  const [selectedDataType, setSelectedDataType] =
    useState<string>("Personal Images");
  const [showCategories, setShowCategories] = useState<boolean>(false);

  // Get paginated images

  const {
    paginatedImages,
    paginatedImagesLoading,
    paginatedImagesError,
    hasMore,
    getFirstPage,
    getNextPage,
    getPreviousPage,
  } = usePaginatedImages();

  // Fetch the first page on component mount
  useEffect(() => {
    getFirstPage();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get default images
  const { defaultImages } = useGetDefaultImages();

  // Access darkmode context
  const { darkmode } = useTheme();

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Determine images to display based on selected data type (Personal or Default)
  const imagesToDisplay =
    selectedDataType === "Personal Images" ? paginatedImages : defaultImages;

  // Filter images array based on active category
  const filteredImages = imagesToDisplay?.filter(
    (image) => image.category === activeCategory
  );

  // Use filtered images unless active category is default "All Images"
  const finalImagesToDisplay =
    activeCategory !== "All" ? filteredImages : imagesToDisplay;

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

  // Functions to handle click on pagination arrows
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getPreviousPage();
    }
  };

  const handleNextPage = () => {
    getNextPage();
    setCurrentPage(currentPage + 1);
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
            className="image-gallery__radio cursor-pointer flex"
            type="radio"
            id="personal"
            name="data_type"
            value="Personal Images"
            checked={selectedDataType === "Personal Images"}
            onChange={handleRadioChange}
          />
          <label className="body body--secondary" htmlFor="personal">
            My Images
          </label>
          <input
            className="image-gallery__radio cursor-pointer ml-5"
            type="radio"
            id="default"
            name="data_type"
            value="Default Images"
            checked={selectedDataType === "Default Images"}
            onChange={handleRadioChange}
          />
          <label className="body body--secondary " htmlFor="default">
            Default Images
          </label>
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
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            hasMore={hasMore}
            loading={paginatedImagesLoading}
          />
        )}

        {loading && paginatedImagesLoading && <LoadingSpinner />}

        {paginatedImagesError && <p>{paginatedImagesError}</p>}
      </div>
    </>
  );
};

export default ImageGalleryPage;
