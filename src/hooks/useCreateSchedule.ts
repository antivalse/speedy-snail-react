/* Custom hook to create a new user schedule in db */

import { useState } from "react";
import { Schedule } from "../types/Schedule.types";
import { schedulesCollection } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const useCreateSchedule = () => {
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const createSchedule = async (data: Schedule) => {
    setIsError(false);
    setIsCreated(false);

    try {
      const documentRef = doc(schedulesCollection);

      await setDoc(documentRef, {
        ...data,
      });
      setError(null);
      setIsError(true);
      setIsCreated(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(
          `Something went wrong when creating schedule: ${err.message} `
        );
      }
    }
  };

  return {
    createSchedule,
    error,
    isCreated,
    isError,
  };
};

export default useCreateSchedule;
