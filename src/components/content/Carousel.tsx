/* Carousel Component */

import { scrollLeft, scrollRight } from "../../assets/icons";
import { Image } from "../../types/Image.types";

interface CarouselProps {
  data: Image[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <div className="suggestions flex flex-col">
      <div className="relative suggestions__carousel bg-s500 flex flex-col">
        <div className="suggestions__carousel__content-wrapper ">
          <h2 className="heading heading--primary color-p300 m-10">
            Suggestions
          </h2>
          <span className="absolute top-1/2 -translate-y-1/2 left-0 mt-10  cursor-pointer">
            {scrollLeft}
          </span>
          <ul className="suggestions__carousel__inner flex">
            {data.map((item) => (
              <li key={item._id} className="flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.title}
                  className="suggestions__carousel__img flex bg-s500"
                />
                {}
              </li>
            ))}
          </ul>
          <span className="absolute top-1/2 -translate-y-1/2 right-0 mt-10 cursor-pointer">
            {scrollRight}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
