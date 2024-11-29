/* Custom hook to update an image */

import { useState } from "react";

const useUpdateImage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateImage = async () => {
    setIsUpdating(true);
    setError(null);
  };
  return {
    updateImage,
    isUpdating,
    error,
  };
};

export default useUpdateImage;
