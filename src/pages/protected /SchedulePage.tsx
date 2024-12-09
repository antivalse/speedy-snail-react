/* Schedule Landing Page */

import { useEffect, useState } from "react";
import AddImage from "../../components/ui/AddImage";
import useGetUser from "../../hooks/useGetUser";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import useGetImages from "../../hooks/useGetImages";
import { Image } from "../../types/Image.types";
import { closeIcon } from "../../assets/icons";
import SortByCategory from "../../components/content/SortByCategory";
import useGetCategories from "../../hooks/useGetCategories";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useCreateSchedule from "../../hooks/useCreateSchedule";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useGetSchedules from "../../hooks/useGetSchedules";

const SchedulePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Images");
  const [loading, setLoading] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Image[] | []>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Access useNavigate hook
  const navigate = useNavigate();

  // Access user data
  const { data } = useGetUser();

  // Check for schedules in schedules collection that match the user id
  const schedules = useGetSchedules();

  useEffect(() => {
    if (schedules.data) {
      // Navigate to the schedule page with created schedule
      navigate(`/schedule/${schedules.data[0]._id}`);
    }
  }, [schedules.data, navigate]);

  // Access function to create new schedule in Firebase
  const { createSchedule } = useCreateSchedule();

  // Get today's date
  const date = new Date()
    .toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .replace(/,/g, "\n"); // Remove commas

  // Get all images
  const imageData = useGetImages();
  const allImages = imageData.data;

  // Get categories data from Firebase and store in variable
  const categories = useGetCategories();
  const categoriesArray = categories.data;

  // Filter images array based on active category
  const filteredImages = allImages?.filter(
    (image) => image.category === activeCategory
  );

  // Determine images to display based on active category unless active category is default "All"
  const imagesToDisplay =
    activeCategory !== "All Images" ? filteredImages : allImages;

  // Function to handle selection of new category and fake loading state
  const handleSelection = (category: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setLoading(false);
    }, 1000);
  };

  // Handle closing images modal
  const handleClose = () => {
    setActiveCategory("All Images");
    setShowModal(false);
  };

  // Handle image click - create a new schedule and add image to it
  const handleImageClick = async (id: string) => {
    const selectedImage = allImages.find((img) => img._id === id);

    // Abort if no image was selected
    if (!selectedImage) {
      return;
    }

    // Update the schedule render
    const updatedSchedule = [...schedule, selectedImage];
    setSchedule(updatedSchedule);

    // Add to the database
    if (!schedule.length) {
      const createdSchedule = await createSchedule({
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        images: updatedSchedule, // Use the updated schedule directly
        uid: data?.uid,
      });

      navigate(`/schedule/${createdSchedule}`); // This will update the URL
    }
    setShowModal(false);
  };

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
        <h2
          id="date"
          className="heading heading--primary mb-10 color-p300 whitespace-pre-wrap text-center"
        >
          {date}
        </h2>

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

        {loading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default SchedulePage;
