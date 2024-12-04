/* Carousel Component */

import { useState } from "react";
import { scrollLeft, scrollRight } from "../../assets/icons";
import { Image } from "../../types/Image.types";

interface CarouselProps {
  data: Image[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the maxIndex based on the number of items per slide
  const imagesPerSlide = 4; // 1 image per slide by default (mobile first)

  const maxIndex = Math.ceil(data.length / imagesPerSlide) - 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };
  return (
    <div className="relative suggestions flex flex-col">
      <h2 className="heading heading--primary self-center color-p300 mb-10">
        Suggestions
      </h2>
      <div className="relative suggestions__carousel">
        {/* Carousel Content */}
        <div className="suggestions__carousel__content-wrapper flex flex-col justify-center">
          {/* Left Navigation */}
          <button
            className="absolute left-0 z-10 cursor-pointer"
            onClick={prevSlide}
          >
            {scrollLeft}
          </button>
          <ul
            className="suggestions__carousel__inner flex transition-transform duration-300"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / imagesPerSlide)
              }%)`,
            }}
          >
            {data.map((item, index) => (
              <li
                key={index}
                className="suggestions__carousel__item flex-shrink-0"
                style={{ width: `${100 / imagesPerSlide}%` }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="suggestions__carousel__img bg-s700"
                />
              </li>
            ))}
          </ul>
          {/* Right Navigation */}
          <button
            className="absolute right-0 z-10 cursor-pointer"
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
