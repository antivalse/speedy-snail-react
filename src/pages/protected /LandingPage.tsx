/* Landing Page */

import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useCreateSchedule from "../../hooks/useCreateSchedule";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useGetSchedules from "../../hooks/useGetSchedules";
import Assistant from "../../components/content/Assistant";
import {
  landingPageMessage,
  landingPageMessageCreated,
} from "../../assets/infoMessages";
import { snailJokes } from "../../assets/snailJokes";

const LandingPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [joke, setJoke] = useState<string | null>(null);

  // Access useNavigate hook
  const navigate = useNavigate();

  // Access user data
  const { data } = useGetUser();

  // Check for schedules in schedules collection that match the user id
  const schedules = useGetSchedules();

  // Access function to create new schedule in Firebase
  const { createSchedule, createScheduleError } = useCreateSchedule();

  const handleBtnClick = async () => {
    setLoading(true);

    try {
      if (schedules.data !== null && schedules.data.length > 0) {
        // Navigate to the schedule page with created schedule if there is any data
        setTimeout(() => {
          navigate(`/schedule/${schedules.data![0]._id}`);
        }, 1500);

        // Otherwise stay on schedule page
      } else {
        const createdScheduleId = await createSchedule({
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          images: [],
          uid: data?.uid,
        });

        // Navigate to the schedule page with created schedule id
        navigate(`/schedule/${createdScheduleId}`);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Schedule error - try again later?");
      }
    }
  };

  const handleSettingsBtnClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/settings`);
      setLoading(false);
    }, 1500);
  };

  const getRandomSnailJoke = () => {
    const randomIndex = Math.floor(Math.random() * snailJokes.length);
    setJoke(snailJokes[randomIndex]);
    setTimeout(() => {
      setJoke(null);
    }, 5000);
  };

  useEffect(() => {
    scrollToDiv("assistant-greeting");
  }, []);

  return (
    <>
      <Assistant
        message={
          schedules.data?.length
            ? landingPageMessageCreated
            : landingPageMessage
        }
      />
      <div className="landing-page flex flex-col items-center my-10 color-p300">
        <div className="landing-page__main flex flex-col items-center bg-p100">
          <h2 className="heading heading--primary">
            Welcome, {data?.username}!{" "}
          </h2>

          <p
            className={`landing-page__main__text ${
              joke ? "bg-s800" : "bg-p150"
            }`}
          >
            {joke
              ? joke
              : "In the Speedy Snail universe, the possibilities are endless! What do you want to do today?"}
          </p>

          <div className="flex gap-5">
            <button
              className="btn btn--clear btn--clear--darker"
              onClick={handleBtnClick}
            >
              {schedules.data?.length ? "Go to Schedule" : "Create Schedule"}
            </button>
            <button className="btn btn--clear" onClick={handleSettingsBtnClick}>
              Go to Settings
            </button>
            <button
              className="btn btn--clear btn--clear--pink"
              onClick={getRandomSnailJoke}
            >
              Laugh
            </button>
          </div>

          {error && (
            <div
              className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}
        </div>

        {loading && <LoadingSpinner />}
        {createScheduleError && createScheduleError.length > 0 && (
          <p
            className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {createScheduleError}
          </p>
        )}
      </div>
    </>
  );
};

export default LandingPage;
