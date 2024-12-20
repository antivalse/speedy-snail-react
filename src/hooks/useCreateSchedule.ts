/* Custom hook to create a new user schedule in db */

import { useState } from "react";
import { Schedule } from "../types/Schedule.types";
import { schedulesCollection } from "../firebase/config";
import { addDoc } from "firebase/firestore";

const useCreateSchedule = () => {
  const [createScheduleError, setCreateScheduleError] = useState<string | null>(
    null
  );

  const createSchedule = async (data: Schedule) => {
    setCreateScheduleError(null);

    try {
      const scheduleDoc = await addDoc(schedulesCollection, data);
      setCreateScheduleError(null);

      // Use the document ID for future updates
      const scheduleId = scheduleDoc.id;
      return scheduleId;
    } catch (err) {
      if (err instanceof Error) {
        setCreateScheduleError(
          `Something went wrong when creating schedule: ${err.message} `
        );
      }
    }
  };

  return {
    createSchedule,
    createScheduleError,
  };
};

export default useCreateSchedule;
