/* Custom hook to get all schedules from Firebase */

import { where } from "firebase/firestore";
import { schedulesCollection } from "../firebase/config";
import useAuth from "./useAuth";
import useSyncedCollection from "./useSyncedCollection";

const useGetSchedules = () => {
  // Get user
  const { user } = useAuth();

  // Fetch user-specific schedule(userId == user.uid) only if the user is logged in
  const { data, loading: scheduleLoading } = useSyncedCollection(
    schedulesCollection,
    where("uid", "==", user?.uid)
  );

  return {
    data,
    scheduleLoading,
  };
};

export default useGetSchedules;
