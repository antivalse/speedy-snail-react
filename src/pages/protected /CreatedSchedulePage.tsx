import { useNavigate, useParams } from "react-router-dom";
import TodaysDate from "../../components/content/TodaysDate";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useGetSchedule from "../../hooks/useGetSchedule";
import useGetImages from "../../hooks/useGetImages";
import { Image } from "../../types/Image.types";
import { useEffect, useState } from "react";
import useGetCategories from "../../hooks/useGetCategories";
import shuffleArray from "../../utils/helpers/shuffleArray";
import AddImage from "../../components/ui/AddImage";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import SortByCategory from "../../components/content/SortByCategory";
import { closeIcon } from "../../assets/icons";
import useUpdateSchedule from "../../hooks/useUpdateSchedule";
import { scheduleDefaultMsg, funDay } from "../../assets/infoMessages";
import SplideCarousel from "../../components/content/SplideCarousel";
import Assistant from "../../components/content/Assistant";

const CreatedSchedulePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Images");
  const [loading, setLoading] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Image[] | []>([]);
  const [infoMessage, setInfoMessage] = useState<string | null>(
    scheduleDefaultMsg
  );
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Get schedule id from params
  const { id } = useParams();

  // Get the schedule if there is one
  const { userSchedule, isScheduleLoading, getScheduleError } = useGetSchedule(
    id || ""
  );

  // Use navigate to navigate user
  const navigate = useNavigate();

  // Get all images
  const imageData = useGetImages();
  const allImages = imageData.data;

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Access hook to delete/update schedule
  const {
    addImageToSchedule,
    removeAllImagesFromSchedule,
    removeImageFromSchedule,
  } = useUpdateSchedule();

  // Monitor `userSchedule` and update the `schedule` state
  useEffect(() => {
    if (userSchedule?.images) {
      setSchedule(userSchedule.images);
      setInfoMessage(funDay);
    }
  }, [userSchedule]);

  // Filter images array based on active category
  const filteredImages = allImages?.filter(
    (image) => image.category === activeCategory
  );

  // Determine images to display based on active category unless active category is default "All"
  const imagesToDisplay =
    activeCategory !== "All Images" ? filteredImages : allImages;

  // Random selection of images for suggestion carousel
  const shuffledImages = shuffleArray<Image>(allImages).slice(0, 8);

  // Splide Style
  const splideStyle: React.CSSProperties = {
    width: "100%",
    height: "12rem",
    objectFit: "contain",
  };

  // Function to handle selection of new category and fake loading state
  const handleSelection = (category: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setLoading(false);
    }, 1000);
  };

  // Handle image click and update the schedule
  const handleImageClick = (id: string) => {
    const selectedImage = allImages.find((img) => img._id === id);

    // Abort if no image was selected or if the maximum amount of activities are set
    if (!selectedImage) {
      return;
    }

    if (schedule.length === 6) {
      setInfoMessage(
        "Oops, you can't add more than 6 images to schedule. Remove one or clear all to start over"
      );

      setTimeout(() => {
        setInfoMessage(null);
      }, 4000);
      scrollToDiv("plan-page__info");
      return;
    }
    // Add image to schedule in db and update the rendering of schedule
    addImageToSchedule(userSchedule?._id || "", selectedImage);

    // Close modal
    setShowModal(false);
  };

  // Handle closing images modal
  const handleClose = () => {
    setActiveCategory("All Images");
    setShowModal(false);
  };

  // Clear the array
  const handleClear = () => {
    removeAllImagesFromSchedule(userSchedule?._id || "");
    setSchedule([]);
    navigate("/schedule");
  };

  // Scroll to greeting on re-render
  useEffect(() => {
    // If there is an error (for instance user tries to acces other users schedule by typing id in url). Navigate to schedule page
    if (getScheduleError) {
      navigate("/schedule");
    }

    if (userSchedule && userSchedule?.images.length > 0) {
      setInfoMessage(funDay);
    }
    scrollToDiv("assistant-greeting");
  }, [getScheduleError, userSchedule, navigate]);

  return (
    <>
      <Assistant message={infoMessage} />
      <div className="plan-page flex flex-col items-center my-10 ">
        <TodaysDate />

        <div className="plan-page__schedule bg-p100 flex flex-col items-center py-10 mb-12">
          <ul className="plan-page__schedule__images">
            {schedule?.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="body body--secondary color-p200">
                  {item.title}
                </h3>
                <div className="relative image-wrapper my-5">
                  <img
                    className="plan-page__schedule__images__image bg-p50 cursor-pointer"
                    src={item.url}
                    alt={item.title}
                  />
                  <div
                    className="absolute top-0 image-overlay cursor-pointer flex justify-center items-center"
                    onClick={() =>
                      removeImageFromSchedule(userSchedule?._id || "", item)
                    }
                  >
                    <span className="body body--secondary color-p50 ">
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {schedule && schedule.length < 6 ? (
              <AddImage handleClick={() => setShowModal(true)} />
            ) : (
              ""
            )}
          </ul>
        </div>
        {showModal && (
          <div className="modal-overlay modal-overlay--lighter">
            <div className="select-image bg-p50 p-10 flex flex-col">
              <span
                onClick={handleClose}
                id="close-icon"
                className="pr-2 mb-6 cursor-pointer self-end"
              >
                {closeIcon}
              </span>
              <div>
                <div className="flex justify-between mt-5">
                  <h2 className="heading heading--primary color-p300 py-3">
                    {activeCategory}{" "}
                  </h2>

                  <SortByCategory
                    data={categoriesArray}
                    handleSelection={handleSelection}
                    showCategories={showCategories}
                    setShowCategories={setShowCategories}
                  />
                </div>
                <ul className="grid grid-cols-4 gap-5">
                  {imagesToDisplay?.map((item, index) => (
                    <li
                      key={index}
                      className="select-image__li cursor-pointer bg-p100 flex justify-center items-center"
                    >
                      <img
                        className="select-image__image"
                        src={item.url}
                        alt={item.title}
                        onClick={() => handleImageClick(item._id || "")}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center gap-4">
                {/* <button className="btn btn--submit shrink-0 self-center">
                  More
                </button> */}
                {imagesToDisplay.length > 8 && (
                  <button
                    className="btn btn--clear shrink-0 self-center"
                    onClick={() => scrollToDiv("close-icon")}
                  >
                    Back to top
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {schedule.length > 0 && (
          <button className="btn btn--clear" onClick={handleClear}>
            Clear Schedule
          </button>
        )}

        {/* <Carousel data={shuffledImages} handleImageClick={handleImageClick} /> */}

        <SplideCarousel
          images={shuffledImages}
          style={splideStyle}
          handleImageClick={handleImageClick}
        />

        {loading || (isScheduleLoading && <LoadingSpinner />)}
      </div>{" "}
    </>
  );
};

export default CreatedSchedulePage;
