/* Image Gallery Page */

import { arrowDown } from "../../assets/icons";
import Pagination from "../../utils/Pagination";
import useGetImages from "../../hooks/useGetImages";
import { useState } from "react";
import useGetCategories from "../../hooks/useGetCategories";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ImageGalleryPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Images");

  // Get image data from Firebase and store in variable
  const { data } = useGetImages();

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

  return (
    <>
      <div className="image-gallery bg-p100 p-10">
        <div className="image-gallery__sorting flex justify-between items-center">
          <h2 className="heading heading--primary color-p300 py-3">
            Category: <span className="color-p200">{activeCategory}</span>
          </h2>
          <div className="relative">
            <button
              className="btn btn--sort flex justify-center items-center gap-2"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setShowCategories(!showCategories)}
            >
              SORT<span>{arrowDown}</span>
            </button>
            {showCategories && (
              <div
                className="absolute mt-5 right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
                onClick={() => setShowCategories(!showCategories)}
              >
                <ul className="py-1" role="none">
                  <li
                    key="default_category"
                    className="block px-4 py-2 text-sm color-p300 cursor-pointer"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                    onClick={() => handleSelection("All Images")}
                  >
                    All
                  </li>
                  {categoriesArray?.map((item) => (
                    <li
                      key={item._id}
                      className="block px-4 py-2 text-sm color-p300 cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                      onClick={() => handleSelection(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}{" "}
          </div>
        </div>
        <ul className="image-gallery__images grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 my-10">
          {imagesToDisplay?.map((item, index) => (
            <li
              key={index}
              className="image-gallery__images__li flex flex-col items-center bg-p50 pb-5 cursor-pointer"
            >
              <h3 className="body body--secondary color-p200 my-5">
                {item.title}
              </h3>
              <Link to={`/edit-image/${item._id}`}>
                <img
                  src={item.url}
                  alt={item.title}
                  className="image-gallery__images__image"
                />
              </Link>
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
