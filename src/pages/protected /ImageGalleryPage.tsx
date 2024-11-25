/* Image Gallery Page */

import { Link } from "react-router-dom";
import { arrowDown } from "../../assets/icons";
import Button from "../../components/buttons/Button";
import Pagination from "../../utils/Pagination";
import useGetImages from "../../hooks/useGetImages";
import AddImage from "../../components/ui/AddImage";

const ImageGalleryPage = () => {
  const images = useGetImages();
  const imageArray = images.data;

  console.log("images are: ", images);
  return (
    <>
      <div className="image-gallery bg-p100 p-10">
        <div className="image-gallery__sorting flex flex-col justify-center items-center gap-10">
          <h2 className="heading heading--primary color-p300 py-3">
            Category: All
          </h2>
          <Button
            scrollToView={false}
            btnText="SORT"
            className="btn btn--sort flex justify-center items-center gap-2"
            icon={arrowDown}
          />
        </div>
        <ul className="image-gallery__images grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 my-10">
          {imageArray?.map((item, index) => (
            <li key={index} className="flex flex-col items-center">
              <h3 className="body body--secondary color-p200 my-5">
                {item.title}
              </h3>
              <Link to={"/edit-image"}>
                <img
                  src={item.url}
                  alt={item.title}
                  className="image-gallery__images__image cursor-pointer"
                />
              </Link>
            </li>
          ))}
          <AddImage />
        </ul>
        <Pagination />
      </div>
    </>
  );
};

export default ImageGalleryPage;
