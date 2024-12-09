/* Custom hook to get realtime schedule collection from db */

import { schedulesCollection } from "../firebase/config";
import { Schedule } from "../types/Schedule.types";
import useGetDocument from "./useGetDocument";

const useGetSchedule = (id: string) => {
  // Get the data using the existing useGetDocument hook
  const {
    data: userSchedule,
    loading: isScheduleLoading,
    error: getScheduleError,
  } = useGetDocument<Schedule>(schedulesCollection, id);

  // Return the renamed data for clarity
  return { userSchedule, isScheduleLoading, getScheduleError };
};

export default useGetSchedule;
