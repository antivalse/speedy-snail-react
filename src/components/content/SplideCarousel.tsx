import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Image } from "../../types/Image.types";
import "../../scss/components/content/_splideCarousel.scss";

interface SplideCarouselProps {
  images: Image[];
  style: React.CSSProperties;
  handleImageClick: (id: string) => void;
}

const SplideCarousel: React.FC<SplideCarouselProps> = ({
  images,
  handleImageClick,
  style,
}) => {
  return (
    <div
      className="splide-carousel mt-20"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
      }}
    >
      <Splide
        aria-label="Schedule Images"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        options={{
          perPage: 4,
          breakpoints: {
            640: { perPage: 1 },
            768: { perPage: 2 },
            1024: { perPage: 3 },
            1408: { perPage: 4 },
          },

          gap: "1rem", // Space between images
          pagination: false, // Disable pagination dots
          arrows: true, // Enable arrows
        }}
      >
        {images.map((image, index) => (
          <SplideSlide
            style={{
              position: "relative",
              textAlign: "center", // Center text horizontally
            }}
            key={index}
            className="suggestions__carousel__item flex flex-col justify-center bg-s900 cursor-pointer"
            onClick={() => handleImageClick(image._id || "")}
          >
            {" "}
            <img src={image.url} alt={image.title} style={style} />
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)", // Center text
                width: "100%",
                paddingTop: "1rem",
                bottom: "2%",
              }}
            >
              <span className="body body--secondary color-p300">
                {image.title}
              </span>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideCarousel;
