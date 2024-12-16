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
  const [loading, setLoading] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Images");
  const [message, setMessage] = useState<string | null>(imageGalleryMessage);

  // Get user personal image data from Firebase and store in variable
  const { userImages } = useGetImages();

  // Get default images
  const { defaultImages } = useGetDefaultImages();
  console.log("default images are: ", defaultImages);

  // Access darkmode context
  const { darkmode } = useTheme();

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Filter images array based on active category
  const filteredImages = userImages?.filter(
    (image) => image.category === activeCategory
  );

  // Determine images to display based on active category unless active category is default "All"
  const imagesToDisplay =
    activeCategory !== "All Images" ? filteredImages : userImages;

  // Function to handle selection of new category and fake loading state
  const handleSelection = (category: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Assistant message={message} />
      <div
        className={`image-gallery p-10 mt-8 ${
          darkmode ? "bg-p300" : "bg-p100"
        }`}
      >
        <div className="image-gallery__sorting flex justify-between items-center">
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
        <ul className="image-gallery__images grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 my-10">
          {imagesToDisplay?.map((item, index) => (
            <li
              key={index}
              className={`${
                item.isDefault
                  ? "image-gallery__images__list-item--default"
                  : "image-gallery__images__list-item cursor-pointer"
              } flex flex-col items-center bg-p50 pb-5`}
            >
              <h3 className="body body--secondary color-p200 my-5">
                {`${item.isDefault ? item.title + "*" : item.title}`}
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
        <Pagination />
        {loading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default ImageGalleryPage;
