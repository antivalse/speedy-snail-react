/* Image Gallery Page */

// import SecondaryNavbar from "../components/navigation /SecondaryNavbar";
import { Link } from "react-router-dom";
import { arrowDown } from "../../assets/icons";
import PlaceholderImg from "../../assets/images/placeholders/scheduleimg_test.png";
import Button from "../../components/buttons/Button";
import SecondaryNavbar from "../../components/navigation/SecondaryNavbar";
import Pagination from "../../utils/Pagination";

// import Pagination from "../components/utils/Pagination";

const ImageGalleryPage = () => {
  const testItems = [
    { id: 1, name: "Eat breakfast", category: "food", image: PlaceholderImg },
    {
      id: 2,
      name: "Eat more breakfast",
      category: "food",
      image: PlaceholderImg,
    },
    {
      id: 3,
      name: "Eat breakfast again",
      category: "school",
      image: PlaceholderImg,
    },
    {
      id: 4,
      name: "Eat last breakfast",
      category: "play",
      image: PlaceholderImg,
    },
    {
      id: 5,
      name: "Go shopping",
      category: "activities",
      image: PlaceholderImg,
    },
  ];
  return (
    <>
      <SecondaryNavbar />
      <div className="image-gallery bg-p100 p-10">
        <div className="image-gallery__sorting flex flex-col justify-center items-center gap-10">
          <h2 className="heading heading--primary color-p300 py-3">
            Category: All
          </h2>
          <Button
            hasLink={false}
            btnText="SORT"
            className="btn btn--sort flex justify-center items-center gap-2"
            icon={arrowDown}
          />
        </div>
        <ul className="image-gallery__images grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 my-10">
          {testItems.map((item) => (
            <li key={item.id} className="flex flex-col items-center">
              <h3 className="body body--secondary color-p200 my-5">
                {item.name}
              </h3>
              <Link to={"/edit-image"}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="image-gallery__images__image cursor-pointer"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Pagination />
      </div>
    </>
  );
};

export default ImageGalleryPage;
