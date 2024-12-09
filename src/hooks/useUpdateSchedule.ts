/* Custom hook to update schedule when user adds or removes images */

import { useState } from "react";

import {
  arrayRemove,
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

  const addImageToSchedule = async (scheduleId: string, data: Image) => {
    setIsUpdating(true);

    if (!scheduleId) {
      setError("Cannot find schedule. Try again or create a new one");
      return;
    }

    try {
      await updateDoc(doc(schedulesCollection, scheduleId), {
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

  const removeImageFromSchedule = async (scheduleId: string, data: Image) => {
    if (!scheduleId) {
      setError("Cannot find schedule. Try again or create a new one");
      return;
    }

    try {
      await updateDoc(doc(schedulesCollection, scheduleId), {
        images: arrayRemove(data),
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
    addImageToSchedule,
    deleteSchedule,
    removeImageFromSchedule,
  };
};

export default useUpdateSchedule;
