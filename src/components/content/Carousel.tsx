/* Carousel Component */

import { useEffect, useState } from "react";
import { scrollLeft, scrollRight } from "../../assets/icons";
import { Image } from "../../types/Image.types";

interface CarouselProps {
  data: Image[];
  handleImageClick: (id: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ data, handleImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(1); // Default to 1 image per slide

  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth >= 1408) {
        setImagesPerSlide(4); // 4 images for large screens
      } else if (window.innerWidth >= 1024) {
        setImagesPerSlide(3); // 3 images for medium screens
      } else if (window.innerWidth >= 768) {
        setImagesPerSlide(2); // 2 images for smaller screens
      } else {
        setImagesPerSlide(1); // 1 image for mobile
      }
    };

    // Update images per slide on load and resize
    updateImagesPerSlide();
    window.addEventListener("resize", updateImagesPerSlide);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", updateImagesPerSlide);
  }, []);

  const maxIndex = Math.ceil(data.length / imagesPerSlide) - 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  return (
    <div className="relative suggestions flex flex-col">
      <h2 className="heading heading--primary self-center color-p300">
        Suggestions
      </h2>
      <div className="relative suggestions__carousel">
        <div className="suggestions__carousel__content-wrapper flex flex-col justify-center">
          <button
            className="absolute left-0 z-10 cursor-pointer"
            onClick={prevSlide}
          >
            {scrollLeft}
          </button>
          <ul
            className="suggestions__carousel__inner flex transition-transform duration-300 gap-3"
            style={{
              transform: `translateX(-${
                (currentIndex * 100) / imagesPerSlide
              }%)`,
            }}
          >
            {data.map((item, index) => (
              <li
                key={index}
                className="suggestions__carousel__item flex flex-col items-center justify-center bg-s900 cursor-pointer"
                onClick={() => handleImageClick(item._id || "")}
              >
                <h4 className="absolute bottom-2 body body--secondary color-p300">
                  {item.title}
                </h4>
                <img
                  src={item.url}
                  alt={item.title}
                  className="suggestions__carousel__img mb-3"
                />
              </li>
            ))}
          </ul>
          <button
            className="absolute right-0 z-9 cursor-pointer"
            onClick={nextSlide}
          >
            {scrollRight}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
