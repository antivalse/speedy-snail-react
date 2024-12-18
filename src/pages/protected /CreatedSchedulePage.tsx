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
import { clearIcon, closeIcon } from "../../assets/icons";
import useUpdateSchedule from "../../hooks/useUpdateSchedule";
import { createdScheduleMessage } from "../../assets/infoMessages";
import SplideCarousel from "../../components/content/SplideCarousel";
import Assistant from "../../components/content/Assistant";
import isSameDate from "../../utils/helpers/isSameDate";
import useGetDefaultImages from "../../hooks/useGetDefaultImages";
import SearchForm from "../../components/forms/SearchForm";

const CreatedSchedulePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Image[] | []>([]);
  const [infoMessage, setInfoMessage] = useState<string | null>(
    createdScheduleMessage
  );
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Get schedule id from paramsw
  const { id } = useParams();

  // Get the schedule if there is one
  const { userSchedule, isScheduleLoading, getScheduleError } = useGetSchedule(
    id || ""
  );

  // Use navigate to navigate user
  const navigate = useNavigate();

  // Get user images
  const imageData = useGetImages();
  const userImages: Image[] | null = imageData.userImages;

  // Get all default images
  const { defaultImages } = useGetDefaultImages();

  // Combine and sort images
  const combinedImages = [...(userImages || []), ...(defaultImages || [])].sort(
    (a, b) => a.title.localeCompare(b.title) // Sort alphabetically by title
  );

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
    }
  }, [userSchedule]);

  // Filtered images based on search input and active category
  const searchFilteredImages = combinedImages.filter((image) =>
    searchInput
      ? image.title.toLowerCase().includes(searchInput.toLowerCase())
      : true
  );

  // Filter images by category
  const categoryFilteredImages =
    activeCategory !== "All"
      ? searchFilteredImages.filter(
          (image) => image.category === activeCategory
        )
      : searchFilteredImages;

  // Final images to display
  const imagesToDisplay = categoryFilteredImages;

  // Random selection of images for suggestion carousel
  const shuffledImages = shuffleArray<Image>(combinedImages ?? []).slice(0, 8);

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
    const selectedImage = combinedImages?.find((img) => img._id === id);

    // Abort if no image was selected or if the maximum amount of activities are set
    if (!selectedImage) {
      return;
    }

    if (schedule.length === 6) {
      setInfoMessage(
        "Oops, you can't add more than 6 images to schedule. Remove one or clear all to start over"
      );
      scrollToDiv("assistant-greeting");

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
    setSearchInput(null);
  };

  // Handle closing images modal
  const handleClose = () => {
    setActiveCategory("All");
    setShowModal(false);
    setSearchInput(null);
  };

  // Clear the array
  const handleClear = () => {
    removeAllImagesFromSchedule(userSchedule?._id || "");
    setSchedule([]);
    setInfoMessage("Nice, room for more adventures!");
    scrollToDiv("assistant-greetingi");
  };

  useEffect(() => {
    // If there is an error (for instance user tries to acces other users schedule by typing id in url). Navigate to schedule page
    if (getScheduleError) {
      navigate("/launchpad");
    }

    // Check if the schedule is created today or not
    isSameDate(
      userSchedule?.createdAt,
      userSchedule?._id,
      removeAllImagesFromSchedule
    );
  }, [
    getScheduleError,
    userSchedule,
    navigate,
    removeAllImagesFromSchedule,
    infoMessage,
  ]);

  // Scroll to greeting on first render
  useEffect(() => {
    scrollToDiv("assistant-greeting");
    setInfoMessage(createdScheduleMessage);
  }, []);

  return (
    <>
      <Assistant message={infoMessage} />
      <div className="plan-page flex flex-col items-center">
        <div className="relative plan-page__schedule flex flex-col items-center bg-p100 py-10 mb-12">
          <TodaysDate />
          <ul className="plan-page__schedule__images px-3 mt-5">
            {schedule?.map((item, index) => (
              <li
                key={index}
                className="relative plan-page__schedule__images__list-item my-5 bg-p50 flex flex-col justify-center"
              >
                <div className="flex flex-col items-center">
                  <h3 className="body body--secondary color-p200">
                    {item.title}
                  </h3>
                  <img
                    className="plan-page__schedule__images__list-item__image cursor-pointer"
                    src={item.url}
                    alt={item.title}
                  />
                </div>
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
              </li>
            ))}

            {schedule && schedule.length < 6 ? (
              <AddImage handleClick={() => setShowModal(true)} />
            ) : (
              ""
            )}
          </ul>
          {schedule.length > 0 && (
            <span
              className="plan-page__schedule__clear cursor-pointer"
              onClick={handleClear}
            >
              {clearIcon}
            </span>
          )}
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
                <SearchForm
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
                <div className="flex justify-between mt-5 items-end">
                  <h2 className="body body--secondary color-p300">
                    {activeCategory}{" "}
                  </h2>

                  <SortByCategory
                    data={categoriesArray}
                    handleSelection={handleSelection}
                    showCategories={showCategories}
                    setShowCategories={setShowCategories}
                  />
                </div>

                {imagesToDisplay.length > 0 ? (
                  <ul className="grid grid-cols-4 gap-5 mt-5">
                    {imagesToDisplay?.map((item, index) => (
                      <li
                        key={index}
                        className="select-image__li cursor-pointer bg-p100 flex flex-col justify-center items-center"
                      >
                        <p className="heading heading--small mt-3">
                          {item.title}
                        </p>
                        <img
                          className="select-image__image"
                          src={item.url}
                          alt={item.title}
                          onClick={() => handleImageClick(item._id || "")}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center mt-20">
                    Uh-oh! No pictures here. Let’s try looking for something
                    else!
                  </p>
                )}
              </div>
              <div className="flex justify-center gap-4">
                {imagesToDisplay && imagesToDisplay.length > 8 && (
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

        <SplideCarousel
          images={shuffledImages}
          style={splideStyle}
          handleImageClick={handleImageClick}
        />
        {loading ||
          isScheduleLoading ||
          !userSchedule ||
          (!combinedImages && <LoadingSpinner />)}
      </div>{" "}
    </>
  );
};

export default CreatedSchedulePage;
