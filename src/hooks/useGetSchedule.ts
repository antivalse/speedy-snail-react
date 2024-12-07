/* Custom hook to get realtime schedule collection from db */

import { schedulesCollection } from "../firebase/config";
import { Schedule } from "../types/Schedule.types";
import useGetDocument from "./useGetDocument";

const useGetSchedule = (id: string) => {
  return useGetDocument<Schedule>(schedulesCollection, id);
};

export default useGetSchedule;
