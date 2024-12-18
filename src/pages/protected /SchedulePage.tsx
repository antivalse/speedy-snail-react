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
import { landingPageMessage } from "../../assets/infoMessages";

const SchedulePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Access useNavigate hook
  const navigate = useNavigate();

  // Access user data
  const { data } = useGetUser();

  // Check for schedules in schedules collection that match the user id
  const schedules = useGetSchedules();

  // Access function to create new schedule in Firebase
  const { createSchedule } = useCreateSchedule();

  // Create a new schedule in db
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

  useEffect(() => {
    scrollToDiv("assistant-greeting");
  }, []);

  return (
    <>
      <Assistant message={landingPageMessage} />
      <div className="landing-page flex flex-col items-center my-10 color-p300">
        <div className="landing-page__main flex flex-col items-center">
          <h2 className="heading heading--primary ">
            What do you want to do today?
          </h2>
          <button className="btn btn--clear" onClick={handleBtnClick}>
            {schedules.data?.length ? "Go to Schedule" : "Create Schedule"}
          </button>
        </div>
        {loading && <LoadingSpinner />}
        {error && (
          <div
            className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SchedulePage;
