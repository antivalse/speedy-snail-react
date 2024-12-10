import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Image } from "../../types/Image.types";

interface SplideCarouselProps {
  images: Image[];
  style: React.CSSProperties;
}

const SplideCarousel: React.FC<SplideCarouselProps> = ({ images, style }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Splide
        aria-label="Schedule Images"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        options={{
          width: "50%",
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            {" "}
            <img
              className="suggestions__carousel__img"
              src={image.url}
              alt={image.title}
              style={style}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideCarousel;
