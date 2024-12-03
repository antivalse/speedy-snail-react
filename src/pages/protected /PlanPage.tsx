/* Plan Page */

import { useEffect, useState } from "react";
import AddImage from "../../components/ui/AddImage";
import useGetUser from "../../hooks/useGetUser";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import useGetImages from "../../hooks/useGetImages";
import { Image } from "../../types/Image.types";

const PlanPage = () => {
  const [schedule, setSchedule] = useState<Image[] | null>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data } = useGetUser();
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

  // Extract array
  const allImages = imageData.data;

  useEffect(() => {
    scrollToDiv("date");
  }, []);
  return (
    <>
      <div className="plan-page flex flex-col items-center my-10 ">
        <h2
          id="date"
          className="heading heading--primary mb-10 color-p300 whitespace-pre-wrap text-center"
        >
          {date}
        </h2>

        <div className="plan-page__greeting mb-8">
          <p className="p-3 body body--secondary--greeting color-p300 text-center">
            Hello there, {data?.username}! What do you want to do today?
          </p>
        </div>
        <div className="plan-page__schedule bg-p100 flex flex-col items-center py-10 mb-12">
          <ul className="plan-page__schedule__images">
            {schedule?.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="body body--secondary color-p200 my-5">
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
            <div className="select-image bg-p50 p-10">
              <span
                onClick={() => setShowModal(false)}
                className="p-5 cursor-pointer"
              >
                Close
              </span>
              <ul className="grid grid-cols-4 gap-5">
                {allImages.map((item, index) => (
                  <li
                    key={index}
                    className="select-image__li cursor-pointer bg-p100 flex justify-center items-center"
                  >
                    <img
                      className="select-image__image"
                      src={item.url}
                      alt={item.title}
                      onClick={() => setShowModal(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="today-page__suggestions"></div>
      </div>
    </>
  );
};

export default PlanPage;
