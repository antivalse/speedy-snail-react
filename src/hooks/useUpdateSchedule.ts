/* Custom hook to update schedule when user adds or removes images */

import { useState } from "react";

import {
  arrayUnion,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { schedulesCollection } from "../firebase/config";
import { Image } from "../types/Image.types";

const useUpdateSchedule = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateSchedule = async (id: string, data: Image) => {
    setIsUpdating(true);
    setError(null);

    try {
      await updateDoc(doc(schedulesCollection, id), {
        images: arrayUnion(data),
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

  const deleteSchedule = async (id: string) => {
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
