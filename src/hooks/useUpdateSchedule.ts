/* Custom hook to update schedule when user adds or removes images */

import { useState } from "react";
import useAuth from "./useAuth";
import { Schedule } from "../types/Schedule.types";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { schedulesCollection } from "../firebase/config";

const useUpdateSchedule = (id: string) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get the uid
  const { user } = useAuth();

  const updateSchedule = async (data: Schedule) => {
    setIsUpdating(true);
    setError(null);

    // User id must match for updating schedule
    if (user?.uid !== data.uid) {
      return;
    }
    try {
      await updateDoc(doc(schedulesCollection, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(
          `Something went wrong when updating the schedule: ${err.message}`
        );
      }
    }
  };

  const deleteSchedule = async () => {
    try {
      await deleteDoc(doc(schedulesCollection, id));
    } catch (err) {
      if (err instanceof Error) {
        setError(`Something went wrong when deleting schedule: ${err.message}`);
      }
    }
  };

  return {
    error,
    isUpdating,
    updateSchedule,
    deleteSchedule,
  };
};

export default useUpdateSchedule;
