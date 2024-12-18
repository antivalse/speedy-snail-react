import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Image } from "../../types/Image.types";
import "../../scss/components/content/_splideCarousel.scss";
import useTheme from "../../hooks/useTheme";

interface SplideCarouselProps {
  images: Image[] | [];
  style: React.CSSProperties;
  handleImageClick: (id: string) => void;
}

const SplideCarousel: React.FC<SplideCarouselProps> = ({
  images,
  handleImageClick,
  style,
}) => {
  const { darkmode } = useTheme();
  return (
    <div className="carousel mt-20 flex flex-col items-center">
      <h2
        className={`heading heading--primary self-center ${
          darkmode ? "color-p50" : "color-p300"
        }`}
      >
        Suggestions
      </h2>
      <div
        className="carousel__splide-carousel mt-10"
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

            gap: "1rem",
            pagination: false, // Disable pagination dots
            arrows: true, // Enable arrows
            speed: 2000, // Set scrolling speed to 2000ms
          }}
        >
          {images?.map((image, index) => (
            <SplideSlide
              style={{
                position: "relative",
                textAlign: "center",
              }}
              key={index}
              className="carousel__splide-carousel__item splide__carousel__item flex flex-col justify-center bg-s900 cursor-pointer"
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
                  paddingTop: "0.9rem",
                  top: "2%",
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
    </div>
  );
};

export default SplideCarousel;
