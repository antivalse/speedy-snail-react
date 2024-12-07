import { useParams } from "react-router-dom";
import Carousel from "../../components/content/Carousel";
import TodaysDate from "../../components/content/TodaysDate";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useGetUser from "../../hooks/useGetUser";
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

const CreatedSchedulePage = () => {
  // State handlers
  const [activeCategory, setActiveCategory] = useState<string>("All Images");
  const [loading, setLoading] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Image[] | []>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Get authenticated user
  const { data } = useGetUser();

  // Get schedule id from params

  const { id } = useParams();

  // Get the schedule if there is one
  const { userSchedule, isScheduleLoading } = useGetSchedule(id || "");

  console.log("user schedule images ", userSchedule?.images);

  // Show modal if there is no current schedule
  if (!userSchedule) {
    console.log(
      "Could not find a schedule. Create a new one: link to /schedule"
    );
  } else {
    console.log("found the schedule!");
  }

  // Get all images
  const imageData = useGetImages();
  const allImages = imageData.data;

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Monitor `userSchedule` and update the `schedule` state
  useEffect(() => {
    if (userSchedule?.images) {
      setSchedule(userSchedule.images);
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

    // Abort if no image was selected
    if (!selectedImage) {
      return;
    }
    console.log("you clicked image!: ", selectedImage);
    // Add image to schedule in db and update the rendering of schedule
  };

  // Handle closing images modal
  const handleClose = () => {
    setActiveCategory("All Images");
    setShowModal(false);
  };

  // Clear the array
  const handleClear = () => {
    setSchedule([]);
    scrollToDiv("schedule-page-greeting");
  };

  // Scroll to greeting on re-render
  useEffect(() => {
    scrollToDiv("schedule-page-greeting");
  }, []);

  return (
    <>
      <div className="plan-page flex flex-col items-center my-10 ">
        <div id="schedule-page-greeting" className="plan-page__greeting mb-8">
          <p className="p-3 body body--secondary--greeting color-p300 text-center">
            Hello there, {data?.username}!
          </p>
        </div>
        <TodaysDate />

        <div className="plan-page__schedule bg-p100 flex flex-col items-center py-10 mb-12">
          <ul className="plan-page__schedule__images">
            {schedule?.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="body body--secondary color-p200">
                  {item.title}
                </h3>
                <img
                  className="plan-page__schedule__images__image"
                  src={item.url}
                  alt={item.title}
                />
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
            Clear
          </button>
        )}

        <Carousel data={shuffledImages} handleImageClick={handleImageClick} />

        {loading && <LoadingSpinner />}
      </div>{" "}
    </>
  );
};

export default CreatedSchedulePage;
