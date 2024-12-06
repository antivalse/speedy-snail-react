/* Custom hook to get realtime schedule collection from db */

import { schedulesCollection } from "../firebase/config";
import { Schedule } from "../types/Schedule.types";
import useGetDocument from "./useGetDocument";

const useGetSchedule = (userId: string) => {
  return useGetDocument<Schedule>(schedulesCollection, userId);
};

export default useGetSchedule;
