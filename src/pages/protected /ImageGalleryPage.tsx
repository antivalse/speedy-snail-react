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

const ImageGalleryPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Images");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(
    "Here are all the you can chose from. Click on an image to get to it's editing page."
  );

  // Get image data from Firebase and store in variable
  const { data } = useGetImages();

  // Access darkmode context
  const { darkmode } = useTheme();

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Filter images array based on active category
  const filteredImages = data?.filter(
    (image) => image.category === activeCategory
  );

  // Determine images to display based on active category unless active category is default "All"
  const imagesToDisplay =
    activeCategory !== "All Images" ? filteredImages : data;

  // Function to handle selection of new category and fake loading state
  const handleSelection = (category: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setLoading(false);
    }, 1000);
  };

  // Function to handle info message setting

  const handleInfoMessage = (message: string) => {
    setShowInfo(true);
    setMessage(message);
  };

  return (
    <>
      <Assistant message={message} />
      <div className={`image-gallery p-10 ${darkmode ? "bg-p300" : "bg-p100"}`}>
        {showInfo && message && message.length > 0 && (
          <div>
            <p>{message}</p>
            <span className="cursor-pointer" onClick={() => setShowInfo(false)}>
              close
            </span>
          </div>
        )}
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
              className="image-gallery__images__li flex flex-col items-center bg-p50 pb-5"
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
                    handleInfoMessage("Cannot click on default images")
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
